// ============================================================================
// routes/admin/quiz/practiceConfig.routes.js
const express = require('express');
const { body, query, param } = require('express-validator');
const { authenticateToken, isAdmin } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');

const adminPracticeConfigController = require('@/controllers/quiz/practiceConfig.controller');

const practiceRouter = express.Router();
practiceRouter.use(authenticateToken);
practiceRouter.use(isAdmin);

/**
 * @route   POST /admin/api/v1/quiz/practice-config
 * @desc    Create practice configuration
 * @access  Admin
 */
practiceRouter.post(
    '/',
    [
        body('sub_category_id').isUUID(),
        body('entry_coins').isInt({ min: 0 }),
        body('timer_enabled').isBoolean(),
        body('timer_duration').optional().isInt({ min: 10 }),
        body('timer_type').optional().isIn(['PER_QUESTION', 'TOTAL']),
        body('refund_rules').isObject(),
        body('terms_content').notEmpty(),
        body('terms_version').notEmpty(),
    ],
    validate,
    adminPracticeConfigController.createConfig
);

/**
 * @route   GET /admin/api/v1/quiz/practice-config
 * @desc    Get practice configurations
 * @access  Admin
 */
practiceRouter.get(
    '/',
    [
        query('sub_category_id').optional().isUUID(),
    ],
    validate,
    adminPracticeConfigController.getConfigs
);

/**
 * @route   PUT /admin/api/v1/quiz/practice-config/:id
 * @desc    Update practice configuration
 * @access  Admin
 */
practiceRouter.put(
    '/:id',
    [
        param('id').isUUID(),
        body('entry_coins').isInt({ min: 0 }),
        body('timer_enabled').isBoolean(),
        body('timer_duration').optional().isInt({ min: 10 }),
        body('timer_type').optional().isIn(['PER_QUESTION', 'TOTAL']),
        body('refund_rules').isObject(),
        body('terms_content').notEmpty(),
        body('terms_version').notEmpty(),
    ],
    validate,
    adminPracticeConfigController.updateConfig
);

/**
 * @route   PUT /admin/api/v1/quiz/practice-config/:id/status
 * @desc    Toggle configuration status
 * @access  Admin
 */
practiceRouter.put(
    '/:id/status',
    [
        param('id').isUUID(),
        body('status').isIn(['ACTIVE', 'INACTIVE']),
    ],
    validate,
    adminPracticeConfigController.toggleStatus
);

module.exports = practiceRouter;