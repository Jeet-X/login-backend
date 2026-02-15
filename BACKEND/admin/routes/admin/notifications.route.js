const express = require('express');
const { body, query, param } = require('express-validator');
const adminNotificationController = require('@/controllers/admin/notification.controller');
const { authenticateToken, isAdmin, isSuperAdmin } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');

const router = express.Router();




/**
 * @route   GET /admin/api/v1/notifications/test
 * @desc    Test endpoint - shows available admin notification endpoints
 * @access  Admin
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Admin notification routes are working',
        timestamp: new Date().toISOString(),
        token: 'required in Authorization header as Bearer token',
        access: 'Admin role required',
        available_endpoints: {
            POST: [
                {
                    create_campaign: '/admin/api/v1/notifications',
                    description: 'Create notification campaign',
                    access: 'Admin',
                    token: 'required',
                    body: {
                        title: 'string, required',
                        message: 'string, required',
                        category: 'enum: SYSTEM|GAME|OFFER|REMINDER|INFO, required',
                        target_type: 'enum: ALL|SEGMENT|CUSTOM|SINGLE, required',
                        target_segment: 'string, optional',
                        target_user_ids: 'array of UUIDs, optional',
                        screen_redirect: 'string, optional',
                        data: 'object, optional',
                        schedule_at: 'ISO8601 datetime, optional'
                    }
                },
                {
                    send_test: '/admin/api/v1/notifications/send-test',
                    description: 'Send test notification to specific user',
                    access: 'Admin',
                    token: 'required',
                    body: {
                        user_id: 'UUID, required',
                        title: 'string, required',
                        message: 'string, required',
                        category: 'enum: SYSTEM|GAME|OFFER|REMINDER|INFO, optional'
                    }
                }
            ],
            GET: [
                {
                    campaigns: '/admin/api/v1/notifications',
                    description: 'Get all notification campaigns',
                    access: 'Admin',
                    token: 'required',
                    query: {
                        limit: 'integer, optional, min 1, max 100',
                        offset: 'integer, optional, min 0'
                    }
                },
                {
                    campaign_detail: '/admin/api/v1/notifications/:id',
                    description: 'Get campaign by ID',
                    access: 'Admin',
                    token: 'required',
                    params: {
                        id: 'UUID, required'
                    }
                }
            ],
            PUT: [
                {
                    cancel_campaign: '/admin/api/v1/notifications/:id/cancel',
                    description: 'Cancel scheduled or ongoing campaign',
                    access: 'Admin',
                    token: 'required',
                    params: {
                        id: 'UUID, required'
                    }
                }
            ]
        },
        notes: {
            authentication: 'All endpoints require admin authentication',
            target_types: {
                ALL: 'Send to all users',
                SEGMENT: 'Send to user segment (requires target_segment)',
                CUSTOM: 'Send to custom user list (requires target_user_ids)',
                SINGLE: 'Send to single user (requires target_user_ids with one UUID)'
            },
            categories: {
                SYSTEM: 'System notifications',
                GAME: 'Game-related notifications',
                OFFER: 'Promotional offers',
                REMINDER: 'Reminder notifications',
                INFO: 'General information'
            }
        }
    });
});

// All routes require admin authentication
router.use(authenticateToken);
router.use(isAdmin); // Add admin check middleware

/**
 * @route   POST /admin/api/v1/notifications
 * @desc    Create notification campaign
 * @access  Admin
 */
router.post(
    '/',
    [
        body('title').notEmpty().trim(),
        body('message').notEmpty().trim(),
        body('category').isIn(['SYSTEM', 'GAME', 'OFFER', 'REMINDER', 'INFO']),
        body('target_type').isIn(['ALL', 'SEGMENT', 'CUSTOM', 'SINGLE']),
        body('target_segment').optional(),
        body('target_user_ids').optional().isArray(),
        body('screen_redirect').optional(),
        body('data').optional().isObject(),
        body('schedule_at').optional().isISO8601(),
    ],
    validate,
    adminNotificationController.createCampaign
);

/**
 * @route   GET /admin/api/v1/notifications
 * @desc    Get all campaigns
 * @access  Admin
 */
router.get(
    '/',
    [
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('offset').optional().isInt({ min: 0 }),
    ],
    validate,
    adminNotificationController.getCampaigns
);

/**
 * @route   GET /admin/api/v1/notifications/:id
 * @desc    Get campaign by ID
 * @access  Admin
 */
router.get(
    '/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    adminNotificationController.getCampaign
);

/**
 * @route   PUT /admin/api/v1/notifications/:id/cancel
 * @desc    Cancel campaign
 * @access  Admin
 */
router.put(
    '/:id/cancel',
    [
        param('id').isUUID(),
    ],
    validate,
    adminNotificationController.cancelCampaign
);

/**
 * @route   POST /admin/api/v1/notifications/test
 * @desc    Send test notification
 * @access  Admin
 */
router.post(
    '/send-test',
    [
        body('user_id').isUUID(),
        body('title').notEmpty(),
        body('message').notEmpty(),
        body('category').optional().isIn(['SYSTEM', 'GAME', 'OFFER', 'REMINDER', 'INFO']),
    ],
    validate,
    adminNotificationController.sendTestNotification
);



module.exports = router;