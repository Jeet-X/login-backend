DROP TABLE IF EXISTS quiz_questions CASCADE;

DROP TABLE IF EXISTS question_sets CASCADE;

DROP TABLE IF EXISTS tournament_slots CASCADE;

DROP TABLE IF EXISTS quiz_sessions CASCADE;

DROP TABLE IF EXISTS terms_acceptance_logs CASCADE;

DROP TABLE IF EXISTS practice_mode_config CASCADE;

DROP TABLE IF EXISTS quiz_categories CASCADE;

DROP TABLE IF EXISTS quiz_sub_categories CASCADE;

-- Migration 1: Create quiz_categories table
CREATE TABLE IF NOT EXISTS quiz_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (
        status IN ('ACTIVE', 'INACTIVE')
    ),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 2: Create quiz_sub_categories table
CREATE TABLE IF NOT EXISTS quiz_sub_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    category_id UUID NOT NULL REFERENCES quiz_categories (id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (
        status IN ('ACTIVE', 'INACTIVE')
    ),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 3: Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sub_category_id UUID NOT NULL REFERENCES quiz_sub_categories (id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option VARCHAR(1) NOT NULL CHECK (
        correct_option IN ('A', 'B', 'C', 'D')
    ),
    difficulty VARCHAR(20) NOT NULL CHECK (
        difficulty IN ('EASY', 'MEDIUM', 'HARD')
    ),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (
        status IN ('ACTIVE', 'INACTIVE')
    ),
    created_by UUID REFERENCES users (id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 4: Create question_sets table
CREATE TABLE IF NOT EXISTS question_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_category_id UUID NOT NULL REFERENCES quiz_sub_categories(id) ON DELETE CASCADE,
    mode VARCHAR(20) NOT NULL CHECK (mode IN ('PRACTICE', 'TOURNAMENT')),
    name VARCHAR(255) NOT NULL,
    total_questions INTEGER NOT NULL,
    difficulty_distribution JSONB NOT NULL,
    is_randomized BOOLEAN DEFAULT TRUE,
    fixed_question_ids UUID[],
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 5: Create tournament_slots table
CREATE TABLE IF NOT EXISTS tournament_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sub_category_id UUID NOT NULL REFERENCES quiz_sub_categories (id) ON DELETE CASCADE,
    question_set_id UUID NOT NULL REFERENCES question_sets (id) ON DELETE CASCADE,
    slot_name VARCHAR(255) NOT NULL,
    entry_coins INTEGER NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    max_players INTEGER NOT NULL,
    current_players INTEGER DEFAULT 0,
    timer_duration INTEGER NOT NULL,
    platform_fee_percentage INTEGER DEFAULT 20,
    reward_distribution JSONB NOT NULL,
    terms_content TEXT NOT NULL,
    terms_version VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'SCHEDULED' CHECK (
        status IN (
            'SCHEDULED',
            'ACTIVE',
            'COMPLETED',
            'CANCELLED'
        )
    ),
    total_pool INTEGER DEFAULT 0,
    distributable_pool INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 6: Create quiz_sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    sub_category_id UUID NOT NULL REFERENCES quiz_sub_categories (id) ON DELETE CASCADE,
    question_set_id UUID REFERENCES question_sets (id),
    slot_id UUID REFERENCES tournament_slots (id),
    mode VARCHAR(20) NOT NULL CHECK (
        mode IN ('PRACTICE', 'TOURNAMENT')
    ),
    entry_coins INTEGER NOT NULL,
    questions JSONB NOT NULL,
    user_answers JSONB,
    score INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    total_questions INTEGER NOT NULL,
    completion_time INTEGER,
    speed_bonus DECIMAL(10, 2) DEFAULT 0,
    accuracy_bonus DECIMAL(10, 2) DEFAULT 0,
    final_score DECIMAL(10, 2) DEFAULT 0,
    refund_coins INTEGER DEFAULT 0,
    rank INTEGER,
    coins_won INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'IN_PROGRESS' CHECK (
        status IN (
            'IN_PROGRESS',
            'COMPLETED',
            'ABANDONED',
            'EXPIRED'
        )
    ),
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 7: Create practice_mode_config table
CREATE TABLE IF NOT EXISTS practice_mode_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sub_category_id UUID NOT NULL REFERENCES quiz_sub_categories (id) ON DELETE CASCADE,
    entry_coins INTEGER NOT NULL,
    timer_enabled BOOLEAN DEFAULT TRUE,
    timer_duration INTEGER,
    timer_type VARCHAR(20) CHECK (
        timer_type IN ('PER_QUESTION', 'TOTAL')
    ),
    refund_rules JSONB NOT NULL,
    terms_content TEXT NOT NULL,
    terms_version VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (
        status IN ('ACTIVE', 'INACTIVE')
    ),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Migration 8: Create terms_acceptance_logs table
CREATE TABLE IF NOT EXISTS terms_acceptance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    context VARCHAR(50) NOT NULL CHECK (
        context IN (
            'PRACTICE',
            'TOURNAMENT',
            'EVENT',
            'STORE'
        )
    ),
    reference_id UUID,
    terms_version VARCHAR(50) NOT NULL,
    accepted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    device_info JSONB
);

-- Migration 9: Create notification_delivery_log table (if not exists)
CREATE TABLE IF NOT EXISTS notification_delivery_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    notification_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    delivery_type VARCHAR(20) NOT NULL CHECK (
        delivery_type IN ('PUSH', 'IN_APP', 'BOTH')
    ),
    status VARCHAR(20) NOT NULL CHECK (
        status IN (
            'SUCCESS',
            'FAILED',
            'PENDING'
        )
    ),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================

-- Quiz Questions Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_questions_sub_category ON quiz_questions (sub_category_id);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON quiz_questions (difficulty);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_status ON quiz_questions (status);

-- Quiz Sessions Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user ON quiz_sessions (user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_slot ON quiz_sessions (slot_id);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_status ON quiz_sessions (status);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_mode ON quiz_sessions (mode);

-- Tournament Slots Indexes
CREATE INDEX IF NOT EXISTS idx_tournament_slots_time ON tournament_slots (start_time, end_time);

CREATE INDEX IF NOT EXISTS idx_tournament_slots_status ON tournament_slots (status);

CREATE INDEX IF NOT EXISTS idx_tournament_slots_sub_category ON tournament_slots (sub_category_id);

-- Question Sets Indexes
CREATE INDEX IF NOT EXISTS idx_question_sets_sub_category ON question_sets (sub_category_id);

CREATE INDEX IF NOT EXISTS idx_question_sets_mode ON question_sets (mode);

-- Terms Acceptance Logs Indexes
CREATE INDEX IF NOT EXISTS idx_terms_logs_user ON terms_acceptance_logs (user_id);

CREATE INDEX IF NOT EXISTS idx_terms_logs_context ON terms_acceptance_logs (context);

-- ============================================================================
-- SEED DATA - Sample Categories and Sub-Categories
-- ============================================================================

-- Insert sample quiz categories
INSERT INTO
    quiz_categories (
        name,
        description,
        display_order
    )
VALUES (
        'General Knowledge',
        'Test your general knowledge',
        1
    ),
    (
        'Mathematics',
        'Math quizzes and puzzles',
        2
    ),
    (
        'Science',
        'Science related quizzes',
        3
    ),
    (
        'Sports',
        'Sports trivia and facts',
        4
    ),
    (
        'Entertainment',
        'Movies, music, and celebrities',
        5
    ) ON CONFLICT DO NOTHING;

-- Insert sample quiz sub-categories (you'll need to replace UUIDs with actual ones from quiz_categories)
-- This is just an example - adjust as needed
DO $$
DECLARE
    gk_cat_id UUID;
    math_cat_id UUID;
    WorldGeography_id UUID;
    History_id UUID;
    CurrentAffairs_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO gk_cat_id FROM quiz_categories WHERE name = 'General Knowledge' LIMIT 1;
    SELECT id INTO math_cat_id FROM quiz_categories WHERE name = 'Mathematics' LIMIT 1;

    -- Insert sub-categories if categories exist
    IF gk_cat_id IS NOT NULL THEN
        INSERT INTO quiz_sub_categories (category_id, name, description, display_order) VALUES
        (gk_cat_id, 'World Geography', 'Questions about world geography', 1),
        (gk_cat_id, 'History', 'Historical events and facts', 2),
        (gk_cat_id, 'Current Affairs', 'Latest news and events', 3)
        ON CONFLICT DO NOTHING;
    END IF;

    IF math_cat_id IS NOT NULL THEN
        INSERT INTO quiz_sub_categories (category_id, name, description, display_order) VALUES
        (math_cat_id, 'Arithmetic', 'Basic arithmetic problems', 1),
        (math_cat_id, 'Algebra', 'Algebraic equations', 2),
        (math_cat_id, 'Geometry', 'Geometric problems', 3)
        ON CONFLICT DO NOTHING;
    END IF;

    SELECT id INTO WorldGeography_id FROM quiz_sub_categories WHERE name = 'World Geography' LIMIT 1;
    SELECT id INTO History_id FROM quiz_sub_categories WHERE name = 'History' LIMIT 1;
    SELECT id INTO CurrentAffairs_id FROM quiz_sub_categories WHERE name = 'Current Affairs' LIMIT 1;

    -- Insert practice mode configuration for different sub-categories

-- Example 1: World Geography - Easy practice with timer
INSERT INTO practice_mode_config (
    sub_category_id,
    entry_coins,
    timer_enabled,
    timer_duration,
    timer_type,
    refund_rules,
    terms_content,
    terms_version,
    status
) VALUES (
    WorldGeography_id, -- Replace with actual sub_category_id
    20,
    TRUE,
    300, -- 5 minutes total
    'TOTAL',
    '{"0": 0, "60": 50, "80": 100}'::jsonb,
    'Practice Mode Terms & Conditions:

1. Entry Fee: 20 coins will be deducted from your wallet upon starting the practice quiz.

2. Refund Policy:
   - Score 80% or above: Get 100% refund (20 coins back)
   - Score 60-79%: Get 50% refund (10 coins back)
   - Score below 60%: No refund

3. Timer: You have 5 minutes to complete all questions. The quiz will auto-submit when time expires.

4. Questions: Once you start, you cannot pause or restart the quiz.

5. Results: Your results will be shown immediately after submission.

By accepting these terms, you agree to participate under these conditions.',
    'v1.0',
    'ACTIVE'
);

-- Example 2: History - Practice without timer
INSERT INTO practice_mode_config (
    sub_category_id,
    entry_coins,
    timer_enabled,
    timer_duration,
    timer_type,
    refund_rules,
    terms_content,
    terms_version,
    status
) VALUES (
    History_id, -- Replace with actual sub_category_id
    15,
    FALSE,
    NULL,
    NULL,
    '{"0": 0, "60": 50, "80": 100}'::jsonb,
    'Practice Mode Terms & Conditions:

1. Entry Fee: 15 coins will be deducted from your wallet upon starting the practice quiz.

2. Refund Policy:
   - Score 80% or above: Get 100% refund (15 coins back)
   - Score 60-79%: Get 50% refund (7-8 coins back)
   - Score below 60%: No refund

3. Timer: No time limit. Take your time to answer all questions.

4. Questions: Once you start, you cannot pause or restart the quiz.

5. Results: Your results will be shown immediately after submission.

By accepting these terms, you agree to participate under these conditions.',
    'v1.0',
    'ACTIVE'
);

-- Example 3: Arithmetic - Low entry with per-question timer
INSERT INTO practice_mode_config (
    sub_category_id,
    entry_coins,
    timer_enabled,
    timer_duration,
    timer_type,
    refund_rules,
    terms_content,
    terms_version,
    status
) VALUES (
    CurrentAffairs_id, -- Replace with actual sub_category_id
    10,
    TRUE,
    30, -- 30 seconds per question
    'PER_QUESTION',
    '{"0": 0, "60": 50, "80": 100}'::jsonb,
    'Practice Mode Terms & Conditions:

1. Entry Fee: 10 coins will be deducted from your wallet upon starting the practice quiz.

2. Refund Policy:
   - Score 80% or above: Get 100% refund (10 coins back)
   - Score 60-79%: Get 50% refund (5 coins back)
   - Score below 60%: No refund

3. Timer: You have 30 seconds per question. Questions auto-submit when time expires.

4. Questions: Once you start, you cannot pause or restart the quiz.

5. Results: Your results will be shown immediately after submission.

By accepting these terms, you agree to participate under these conditions.',
    'v1.1',
    'ACTIVE'
);

END $$;

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_quiz_categories_updated_at BEFORE UPDATE ON quiz_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_sub_categories_updated_at BEFORE UPDATE ON quiz_sub_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_question_sets_updated_at BEFORE UPDATE ON question_sets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tournament_slots_updated_at BEFORE UPDATE ON tournament_slots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_practice_mode_config_updated_at BEFORE UPDATE ON practice_mode_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();