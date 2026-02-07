CREATE TYPE user_role_status AS ENUM ('active', 'inactive');

CREATE TABLE user_roles (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_role_name TEXT NOT NULL,
    user_role_key TEXT NOT NULL,
    user_category_id UUID NOT NULL REFERENCES user_categories (id) ON DELETE CASCADE,
    user_role_status user_role_status DEFAULT 'active' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_user_role_name ON user_roles (user_role_name);

CREATE UNIQUE INDEX idx_user_role_key ON user_roles (user_role_key);

CREATE INDEX idx_user_category_id ON user_roles (user_category_id);

-- {
--   "id":"28944deb-5e2c-4f9a-ac52-e270ca5d0b0e"
--   "user_role_name": "Player",
--   "user_role_key": "player",
--   "user_category_id":  "9a30c723-8e4b-434b-9294-0b3085b4b53c",
--   "user_role_status": "active"
-- }

INSERT INTO
    user_roles (
        user_role_name,
        user_role_key,
        user_category_id,
        user_role_status
    )
VALUES (
        'Player',
        'player',
        '9a30c723-8e4b-434b-9294-0b3085b4b53c',
        'active'
    ) RETURNING *;