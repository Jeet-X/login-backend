CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    admin_level INTEGER NOT NULL,
    department TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CREATE UNIQUE INDEX idx_admin_user_id ON admins (user_id);
-- CREATE INDEX idx_admin_department ON admins (department);
-- {
--   "id":"a1b2c3d4-e5f6-7890-abcd-ef1234567890"
--   "user_id": "f1e2d3c4-b5a6-7890-abcd-ef1234567890",
--   "admin_level": 1,
--   "department": "IT"
-- }
INSERT INTO
    admins (
        user_id,
        admin_level,
        department
    )
VALUES (
        'f1e2d3c4-b5a6-7890-abcd-ef1234567890',
        1,
        'IT'
    ) RETURNING *;