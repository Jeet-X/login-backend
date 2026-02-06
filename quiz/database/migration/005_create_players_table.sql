CREATE TABLE players (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    user_wallet_id UUID REFERENCES user_wallets (id) ON DELETE CASCADE,
    address TEXT,
    currency VARCHAR(3),
    games_played INT,
    city TEXT,
    -- user_category_id UUID NOT NULL REFERENCES user_categories (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CREATE UNIQUE INDEX idx_player_user_id ON players (user_id);
-- CREATE INDEX idx_player_city ON players (city);
-- {
--   "id":"d4e5f6a7-b8c9-0123-4567-89abcdef0123"
--   "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
--   "user_wallet_id": "b1c2d3e4-f5a6-7890-abcd-ef1234567890",
--   "address": "123 Main St, Springfield",
--   "currency": "USD",
--   "city": "Springfield"
-- }
INSERT INTO
    players (
        user_id,
        user_wallet_id,
        address,
        currency,
        games_played,
        city
    )
VALUES (
        'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        'b1c2d3e4-f5a6-7890-abcd-ef1234567890',
        '123 Main St, Springfield',
        'USD',
        'Springfield'
    ) RETURNING *;