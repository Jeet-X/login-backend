-- ==========================================
-- Database Schema for Authentication Backend
-- ==========================================

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_devices CASCADE;

DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS referrals CASCADE;

DROP TABLE IF EXISTS wallets CASCADE;

DROP TABLE IF EXISTS wallet_transactions CASCADE;

DROP TABLE IF EXISTS referral_config CASCADE;

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
    referral_code VARCHAR(20) UNIQUE,
    referred_by UUID REFERENCES users (id),
    referral_code_generated_at TIMESTAMP,
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
-- Referrals Table
-- ==========================================

CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referral_code VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('APPLIED', 'PENDING', 'COMPLETED', 'INVALID')),
    coins_awarded INTEGER DEFAULT 0,
    eligibility_met BOOLEAN DEFAULT FALSE,
    eligibility_met_at TIMESTAMP,
    ip_address VARCHAR(50),
    device_fingerprint VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,

-- Prevent duplicate referrals
UNIQUE ( referrer_user_id, referred_user_id ),

-- Prevent self-referral at database level
CHECK (referrer_user_id != referred_user_id) );

-- ==========================================
-- Wallets Table
-- ==========================================

CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID UNIQUE NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    coin_balance INTEGER DEFAULT 0 CHECK (coin_balance >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Wallets Transactions Table
-- ==========================================
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    wallet_id UUID NOT NULL REFERENCES wallets (id) ON DELETE CASCADE,
    coins INTEGER NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (
        transaction_type IN ('CREDIT', 'DEBIT')
    ),
    source VARCHAR(50) NOT NULL,
    reference_id UUID,
    description TEXT,
    balance_before INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Referral Configuration Table
-- ==========================================
CREATE TABLE IF NOT EXISTS referral_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    coins_per_referral INTEGER DEFAULT 50,
    referee_bonus_coins INTEGER DEFAULT 0,
    eligibility_action VARCHAR(50) DEFAULT 'FIRST_WALLET_ADD',
    max_referrals_per_user INTEGER DEFAULT NULL,
    referral_expiry_days INTEGER DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    referral_config (
        coins_per_referral,
        referee_bonus_coins,
        eligibility_action
    )
VALUES (50, 0, 'FIRST_WALLET_ADD') ON CONFLICT DO NOTHING;

-- ==========================================
-- Indexes
-- ==========================================
CREATE INDEX idx_users_firebase_uid ON users (firebase_uid);

CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users (referral_code);

CREATE INDEX IF NOT EXISTS idx_users_referred_by ON users (referred_by);

CREATE INDEX idx_users_email ON users (email);

CREATE INDEX idx_users_mobile ON users (mobile);

CREATE INDEX idx_users_status ON users (status);

CREATE INDEX idx_user_devices_user_id ON user_devices (user_id);

CREATE INDEX idx_user_devices_fingerprint ON user_devices (device_fingerprint);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals (referrer_user_id);

CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals (referred_user_id);

CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals (status);

CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals (referral_code);

CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets (user_id);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions (user_id);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON wallet_transactions (wallet_id);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_reference_id ON wallet_transactions (reference_id);

CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions (created_at DESC);

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

-- Trigger function to update updated_at timestamp for referrals
CREATE OR REPLACE FUNCTION update_referral_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to referrals table
CREATE TRIGGER update_referrals_updated_at
    BEFORE UPDATE ON referrals
    FOR EACH ROW
    EXECUTE FUNCTION update_referral_updated_at();

-- Apply trigger to wallets table
CREATE TRIGGER update_wallets_updated_at
    BEFORE UPDATE ON wallets
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