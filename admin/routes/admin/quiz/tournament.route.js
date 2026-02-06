const express = require('express');
const { body, query, param } = require('express-validator');
const { authenticateToken, isAdmin } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');
const adminTournamentController = require('@/controllers/quiz/tournament.controller');

const tournamentRouter = express.Router();
tournamentRouter.use(authenticateToken);
// tournamentRouter.use(isAdmin);

/**
 * @route   POST /admin/api/v1/quiz/tournaments
 * @desc    Create tournament slot
 * @access  Admin
 */
tournamentRouter.post(
    '/',
    [
        body('sub_category_id').isUUID(),
        body('question_set_id').isUUID(),
        body('slot_name').notEmpty().trim(),
        body('entry_coins').isInt({ min: 1 }),
        body('start_time').isISO8601(),
        body('end_time').isISO8601(),
        body('max_players').isInt({ min: 2 }),
        body('timer_duration').isInt({ min: 10 }),
        body('platform_fee_percentage').optional().isInt({ min: 0, max: 100 }),
        body('reward_distribution').isObject(),
    ],
    validate,
    adminTournamentController.createSlot
);

/**
 * @route   GET /admin/api/v1/quiz/tournaments
 * @desc    Get all tournament slots
 * @access  Admin
 */
tournamentRouter.get(
    '/',
    [
        query('sub_category_id').optional().isUUID(),
        query('status').optional().isIn(['SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED']),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('offset').optional().isInt({ min: 0 }),
    ],
    validate,
    adminTournamentController.getSlots
);

/**
 * @route   GET /admin/api/v1/quiz/tournaments/stats
 * @desc    Get tournament statistics
 * @access  Admin
 */
tournamentRouter.get('/stats', adminTournamentController.getStatistics);

/**
 * @route   GET /admin/api/v1/quiz/tournaments/:id
 * @desc    Get tournament slot by ID
 * @access  Admin
 */
tournamentRouter.get(
    '/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    adminTournamentController.getSlot
);

/**
 * @route   PUT /admin/api/v1/quiz/tournaments/:id
 * @desc    Update tournament slot
 * @access  Admin
 */
tournamentRouter.put(
    '/:id',
    [
        param('id').isUUID(),
        body('slot_name').notEmpty().trim(),
        body('entry_coins').isInt({ min: 1 }),
        body('start_time').isISO8601(),
        body('end_time').isISO8601(),
        body('max_players').isInt({ min: 2 }),
        body('timer_duration').isInt({ min: 10 }),
        body('reward_distribution').isObject(),
    ],
    validate,
    adminTournamentController.updateSlot
);

/**
 * @route   PUT /admin/api/v1/quiz/tournaments/:id/cancel
 * @desc    Cancel tournament slot
 * @access  Admin
 */
tournamentRouter.put(
    '/:id/cancel',
    [
        param('id').isUUID(),
    ],
    validate,
    adminTournamentController.cancelSlot
);

/**
 * @route   GET /admin/api/v1/quiz/tournaments/:id/results
 * @desc    Get tournament results
 * @access  Admin
 */
tournamentRouter.get(
    '/:id/results',
    [
        param('id').isUUID(),
    ],
    validate,
    adminTournamentController.getResults
);

/**
 * @route   POST /admin/api/v1/quiz/tournaments/:id/finalize
 * @desc    Manually finalize tournament
 * @access  Admin
 */
tournamentRouter.post(
    '/:id/finalize',
    [
        param('id').isUUID(),
    ],
    validate,
    adminTournamentController.finalizeSlot
);

module.exports = tournamentRouter;

