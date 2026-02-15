-- ==========================================
-- database/schema-notifications.sql - Notification System Schema
-- ==========================================

-- User Notifications Table
CREATE TABLE IF NOT EXISTS user_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (
        category IN (
            'SYSTEM',
            'GAME',
            'OFFER',
            'REMINDER',
            'INFO'
        )
    ),
    delivery_mode VARCHAR(20) DEFAULT 'BOTH' CHECK (
        delivery_mode IN ('IN_APP', 'PUSH', 'BOTH')
    ),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    screen_redirect VARCHAR(100),
    data JSONB,
    campaign_id UUID,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_notifications_user_id ON user_notifications (user_id);

CREATE INDEX IF NOT EXISTS idx_user_notifications_is_read ON user_notifications (is_read);

CREATE INDEX IF NOT EXISTS idx_user_notifications_category ON user_notifications (category);

CREATE INDEX IF NOT EXISTS idx_user_notifications_created_at ON user_notifications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_notifications_campaign_id ON user_notifications (campaign_id);

-- Admin Notification Campaigns Table
CREATE TABLE IF NOT EXISTS admin_notification_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (
        category IN (
            'SYSTEM',
            'GAME',
            'OFFER',
            'REMINDER',
            'INFO'
        )
    ),
    target_type VARCHAR(20) NOT NULL CHECK (
        target_type IN (
            'ALL',
            'SEGMENT',
            'CUSTOM',
            'SINGLE'
        )
    ),
    target_segment VARCHAR(50),
    screen_redirect VARCHAR(100),
    data JSONB,
    schedule_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'CREATED' CHECK (
        status IN (
            'CREATED',
            'SCHEDULED',
            'PROCESSING',
            'SENT',
            'FAILED',
            'CANCELLED'
        )
    ),
    total_users INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON admin_notification_campaigns (status);

CREATE INDEX IF NOT EXISTS idx_campaigns_schedule_at ON admin_notification_campaigns (schedule_at);

CREATE INDEX IF NOT EXISTS idx_campaigns_created_by ON admin_notification_campaigns (created_by);

-- Campaign Targets (for custom user lists)
CREATE TABLE IF NOT EXISTS admin_notification_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    campaign_id UUID NOT NULL REFERENCES admin_notification_campaigns (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (campaign_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_campaign_targets_campaign_id ON admin_notification_targets (campaign_id);

CREATE INDEX IF NOT EXISTS idx_campaign_targets_user_id ON admin_notification_targets (user_id);

-- FCM Tokens Table
CREATE TABLE IF NOT EXISTS user_fcm_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    fcm_token TEXT NOT NULL,
    device_type VARCHAR(20) CHECK (
        device_type IN ('android', 'ios', 'web')
    ),
    device_id VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, fcm_token)
);

CREATE INDEX IF NOT EXISTS idx_fcm_tokens_user_id ON user_fcm_tokens (user_id);

CREATE INDEX IF NOT EXISTS idx_fcm_tokens_is_active ON user_fcm_tokens (is_active);

-- Notification Delivery Log
CREATE TABLE IF NOT EXISTS notification_delivery_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    notification_id UUID REFERENCES user_notifications (id) ON DELETE SET NULL,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    delivery_type VARCHAR(20) NOT NULL CHECK (
        delivery_type IN ('PUSH', 'IN_APP')
    ),
    status VARCHAR(20) NOT NULL CHECK (
        status IN (
            'SUCCESS',
            'FAILED',
            'PENDING'
        )
    ),
    error_message TEXT,
    fcm_message_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_delivery_log_notification_id ON notification_delivery_log (notification_id);

CREATE INDEX IF NOT EXISTS idx_delivery_log_user_id ON notification_delivery_log (user_id);

CREATE INDEX IF NOT EXISTS idx_delivery_log_status ON notification_delivery_log (status);

-- Notification Preferences (Future Enhancement)
CREATE TABLE IF NOT EXISTS user_notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    enable_push BOOLEAN DEFAULT TRUE,
    enable_game_notifications BOOLEAN DEFAULT TRUE,
    enable_offer_notifications BOOLEAN DEFAULT TRUE,
    enable_system_notifications BOOLEAN DEFAULT TRUE,
    enable_reminder_notifications BOOLEAN DEFAULT TRUE,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notification_prefs_user_id ON user_notification_preferences (user_id);

-- Triggers
CREATE OR REPLACE FUNCTION update_campaign_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON admin_notification_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_campaign_updated_at();

CREATE TRIGGER update_notification_prefs_updated_at
    BEFORE UPDATE ON user_notification_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();