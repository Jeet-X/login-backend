// routes/quiz.routes.js
const express = require('express');
const { body, query, param } = require('express-validator');
const quizController = require('@/controllers/quiz/quiz.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');
const router = express.Router();


/**
 * @route   GET /api/v1/quiz/test
 * @desc    Test endpoint - shows available quiz endpoints
 * @access  Protected
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Quiz engine routes are working',
        timestamp: new Date().toISOString(),
        token: 'required in Authorization header as Bearer token',
        available_endpoints: {
            GET: [
                {
                    entry_options: '/api/v1/quiz/:sub_category_id/entry',
                    description: 'Get practice and tournament options for a quiz sub-category',
                    token: 'required',
                    params: {
                        sub_category_id: 'UUID, required'
                    }
                },
                {
                    tournament_slots: '/api/v1/quiz/tournaments',
                    description: 'Get available tournament slots',
                    token: 'required',
                    query: {
                        sub_category_id: 'UUID, optional'
                    }
                },
                {
                    history: '/api/v1/quiz/history',
                    description: 'Get user quiz history',
                    token: 'required',
                    query: {
                        mode: 'enum: PRACTICE|TOURNAMENT, optional',
                        limit: 'integer, optional, default 20',
                        offset: 'integer, optional, default 0'
                    }
                },
                {
                    start_tournament_quiz: '/api/v1/quiz/tournament/:session_id/start',
                    description: 'Get questions to start tournament quiz',
                    token: 'required',
                    params: {
                        session_id: 'UUID, required'
                    }
                }
            ],
            POST: [
                {
                    start_practice: '/api/v1/quiz/practice/start',
                    description: 'Start a practice quiz session',
                    token: 'required',
                    body: {
                        sub_category_id: 'UUID, required',
                        terms_accepted: 'boolean, required'
                    }
                },
                {
                    submit_practice: '/api/v1/quiz/practice/:session_id/submit',
                    description: 'Submit practice quiz answers',
                    token: 'required',
                    params: {
                        session_id: 'UUID, required'
                    },
                    body: {
                        answers: 'array of strings (A/B/C/D), required',
                        completion_time: 'integer (seconds), required'
                    }
                },
                {
                    join_tournament: '/api/v1/quiz/tournament/join',
                    description: 'Join a tournament slot',
                    token: 'required',
                    body: {
                        slot_id: 'UUID, required',
                        terms_accepted: 'boolean, required'
                    }
                },
                {
                    submit_tournament: '/api/v1/quiz/tournament/:session_id/submit',
                    description: 'Submit tournament quiz answers',
                    token: 'required',
                    params: {
                        session_id: 'UUID, required'
                    },
                    body: {
                        answers: 'array of strings (A/B/C/D), required',
                        completion_time: 'integer (seconds), required'
                    }
                }
            ]
        },
        quiz_modes: {
            PRACTICE: {
                description: 'Solo quiz with conditional coin refund',
                features: [
                    'Entry coins deducted',
                    'Score ≥80% = 100% refund',
                    'Score ≥60% = 50% refund',
                    'Score <60% = No refund',
                    'Optional timer',
                    'Instant results'
                ]
            },
            TOURNAMENT: {
                description: 'Competitive quiz with prize pool',
                features: [
                    'Entry coins deducted',
                    'Slot-based participation',
                    'Same questions for all players',
                    'Mandatory timer',
                    'Scoring: base + speed bonus + accuracy bonus',
                    'Results declared after tournament ends',
                    'Top ranks win from prize pool',
                    '20% platform fee'
                ]
            }
        }
    });
});

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/v1/quiz/:sub_category_id/entry
 * @desc    Get entry options for quiz sub-category
 * @access  Protected
 */
router.get(
    '/:sub_category_id/entry',
    [
        param('sub_category_id').isUUID(),
    ],
    validate,
    quizController.getEntryOptions
);

/**
 * @route   POST /api/v1/quiz/practice/start
 * @desc    Start practice quiz
 * @access  Protected
 */
router.post(
    '/practice/start',
    [
        body('sub_category_id').isUUID(),
        body('terms_accepted').isBoolean().equals('true'),
    ],
    validate,
    quizController.startPractice
);

/**
 * @route   POST /api/v1/quiz/practice/:session_id/submit
 * @desc    Submit practice quiz
 * @access  Protected
 */
router.post(
    '/practice/:session_id/submit',
    [
        param('session_id').isUUID(),
        body('answers').isArray(),
        body('completion_time').isInt({ min: 0 }),
    ],
    validate,
    quizController.submitPractice
);

/**
 * @route   GET /api/v1/quiz/tournaments
 * @desc    Get available tournament slots
 * @access  Protected
 */
router.get(
    '/tournaments',
    [
        query('sub_category_id').optional().isUUID(),
    ],
    validate,
    quizController.getTournamentSlots
);

/**
 * @route   POST /api/v1/quiz/tournament/join
 * @desc    Join tournament slot
 * @access  Protected
 */
router.post(
    '/tournament/join',
    [
        body('slot_id').isUUID(),
        body('terms_accepted').isBoolean().equals('true'),
    ],
    validate,
    quizController.joinTournament
);

/**
 * @route   GET /api/v1/quiz/tournament/:session_id/start
 * @desc    Start tournament quiz
 * @access  Protected
 */
router.get(
    '/tournament/:session_id/start',
    [
        param('session_id').isUUID(),
    ],
    validate,
    quizController.startTournamentQuiz
);

/**
 * @route   POST /api/v1/quiz/tournament/:session_id/submit
 * @desc    Submit tournament quiz
 * @access  Protected
 */
router.post(
    '/tournament/:session_id/submit',
    [
        param('session_id').isUUID(),
        body('answers').isArray(),
        body('completion_time').isInt({ min: 0 }),
    ],
    validate,
    quizController.submitTournament
);

/**
 * @route   GET /api/v1/quiz/history
 * @desc    Get user quiz history
 * @access  Protected
 */
router.get(
    '/history',
    [
        query('mode').optional().isIn(['PRACTICE', 'TOURNAMENT']),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('offset').optional().isInt({ min: 0 }),
    ],
    validate,
    quizController.getHistory
);

module.exports = router;