-- ==========================================
-- Database Schema for Authentication Backend
-- ==========================================

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_devices CASCADE;

DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- Users Table
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_mobile_verified BOOLEAN DEFAULT FALSE,
    referral_code VARCHAR(50),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (
        status IN ('ACTIVE', 'BLOCKED')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- ==========================================
-- User Devices Table
-- ==========================================
CREATE TABLE user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    device_fingerprint VARCHAR(255) NOT NULL,
    device_info JSONB,
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'TRUSTED' CHECK (
        status IN ('TRUSTED', 'BLOCKED')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Indexes
-- ==========================================
CREATE INDEX idx_users_firebase_uid ON users (firebase_uid);

CREATE INDEX idx_users_email ON users (email);

CREATE INDEX idx_users_mobile ON users (mobile);

CREATE INDEX idx_users_status ON users (status);

CREATE INDEX idx_user_devices_user_id ON user_devices (user_id);

CREATE INDEX idx_user_devices_fingerprint ON user_devices (device_fingerprint);

-- ==========================================
-- Triggers
-- ==========================================

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- Success Notification
-- ==========================================
DO $$
BEGIN
    RAISE NOTICE '✅ Database schema created successfully!';
    RAISE NOTICE '   Tables: users, user_devices';
    RAISE NOTICE '   Indexes: 6 indexes created';
    RAISE NOTICE '   Triggers: update_users_updated_at';
END $$;