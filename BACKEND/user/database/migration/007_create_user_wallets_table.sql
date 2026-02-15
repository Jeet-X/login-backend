CREATE TABLE user_wallets (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    wallet_address TEXT,
    currency VARCHAR(3) NOT NULL,
    balance NUMERIC DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_wallet_address ON user_wallets (wallet_address);

CREATE INDEX idx_currency ON user_wallets (currency);
-- {
--   "id":"b1c2d3e4-f5a6-7890-abcd-ef1234567890"
--   "wallet_address": "0xABCDEF1234567890",
--   "currency": "ETH",
--   "balance": 100.50
-- }
INSERT INTO
    user_wallets (
        wallet_address,
        currency,
        balance
    )
VALUES (
        '0xABCDEF1234567890',
        'ETH',
        100.50
    ) RETURNING *;