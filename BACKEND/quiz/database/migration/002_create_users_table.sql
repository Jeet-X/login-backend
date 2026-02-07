CREATE TYPE user_status AS ENUM ('active', 'inactive');

CREATE TYPE user_type AS ENUM ( 'super-admin','admin', 'employee', 'player');

CREATE TYPE user_block_status AS ENUM ('yes', 'no');


CREATE TABLE users ( id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

firebase_user_id TEXT UNIQUE NOT NULL,
-- Name
first_name TEXT NOT NULL, middle_name TEXT, last_name TEXT NOT NULL,

-- Email
email_address TEXT CHECK (
    email_address ~ * '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
),
email_is_valid BOOLEAN DEFAULT FALSE,

-- Login Email
login_email_address TEXT CHECK (
    login_email_address ~ * '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
),
login_email_is_valid BOOLEAN DEFAULT FALSE,

-- Relations
-- user_category_id UUID NOT NULL,
-- user_role_id UUID NOT NULL,
player_id UUID, employee_id UUID,

-- Auth

user_status user_status DEFAULT 'active',
  user_type user_type NOT NULL,
  user_block_status user_block_status DEFAULT 'no',
  user_block_time TIMESTAMP,

  timezone TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ADMIN
-- INSERT INTO
--     users (
--         first_name,
--         middle_name,
--         last_name,
--         email_address,
--         email_is_valid,
--         user_category_id,
--         user_role_id,
--         password,
--         user_status,
--         user_type,
--         user_block_status,
--         timezone
--     )
-- VALUES (
--         'Dr. Anirban',
--         '',
--         'Das',
--         'anirban.das@edovuventures.com',
--         false,
--         '639724d9-1183-49ef-a9b7-770ff02cadb6',
--         '28944deb-5e2c-4f9a-ac52-e270ca5d0b0e',
--         'DWTeWFDQT5+8a+wOSBYhNw==',
--         'active',
--         'admin',
--         'no',
--         '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi'
--     ) RETURNING *;

-- PLAYER
-- INSERT INTO
--     users (
--         first_name,
--         middle_name,
--         last_name,
--         email_address,
--         email_is_valid,
--         user_category_id,
--         user_role_id,
--         password,
--         user_status,
--         user_type,
--         user_block_status,
--         timezone
--     )
-- VALUES (
--         'Himanshi',
--         '',
--         'Pahwa',
--         'himanshi.pahwa@gmail.com',
--         false,
--         '9a30c723-8e4b-434b-9294-0b3085b4b53c',
--         '681d03de-d39d-427e-b0b4-d1cb7144b8cf',
--         'DWTeWFDQT5+8a+wOSBYhNw==',
--         'active',
--         'player',
--         'no',
--         '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi'
--     ) RETURNING *;