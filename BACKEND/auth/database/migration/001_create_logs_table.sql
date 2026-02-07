CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE log_status AS ENUM ('success', 'failed');

CREATE TABLE logs (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    relation TEXT NOT NULL,
    email TEXT CHECK (
        email ~ * '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
    ),
    internet_protocol_address TEXT NOT NULL,
    status log_status NOT NULL,
    message TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);