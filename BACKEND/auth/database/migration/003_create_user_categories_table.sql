CREATE TYPE user_category_name_enum AS ENUM (
    'Super Admin', 'Admin', 'Employee', 'Player'
);

CREATE TYPE user_category_enum AS ENUM (
    'super-admin', 'admin', 'employee', 'player', 
);

CREATE TABLE user_categories (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_category_name user_category_name_enum NOT NULL,
    user_category user_category_enum NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_user_category_name ON user_categories (user_category_name);

CREATE UNIQUE INDEX idx_user_category ON user_categories (user_category);

CREATE UNIQUE INDEX idx_user_category_name_category ON user_categories (
    user_category_name,
    user_category
);

INSERT INTO
    user_categories (
        user_category_name,
        user_category
    )
VALUES ('Player', 'player') RETURNING *;