const express = require('express');
const { body, query, param } = require('express-validator');
const notificationController = require('@/controllers/notifications/notifications.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');

const router = express.Router();



/**
 * @route   GET /api/v1/notifications/test
 * @desc    Test endpoint - shows available notification endpoints
 * @access  Protected
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Notification routes are working',
        timestamp: new Date().toISOString(),
        token: 'required in Authorization header as Bearer token',
        available_endpoints: {
            GET: [
                {
                    notifications: '/api/v1/notifications',
                    description: 'Get user notifications',
                    token: 'required',
                    query: {
                        category: 'optional, enum: ALL|SYSTEM|GAME|OFFER|REMINDER|INFO',
                        limit: 'optional, integer, min 1, max 100',
                        offset: 'optional, integer, min 0'
                    }
                },
                {
                    unread_count: '/api/v1/notifications/unread-count',
                    description: 'Get unread notification count',
                    token: 'required'
                }
            ],
            PUT: [
                {
                    mark_read: '/api/v1/notifications/:id/read',
                    description: 'Mark notification as read',
                    token: 'required',
                    params: {
                        id: 'UUID, required'
                    }
                },
                {
                    mark_all_read: '/api/v1/notifications/read-all',
                    description: 'Mark all notifications as read',
                    token: 'required'
                }
            ],
            DELETE: [
                {
                    delete_notification: '/api/v1/notifications/:id',
                    description: 'Delete notification',
                    token: 'required',
                    params: {
                        id: 'UUID, required'
                    }
                }
            ],
            POST: [
                {
                    register_token: '/api/v1/notifications/register-token',
                    description: 'Register FCM token for push notifications',
                    token: 'required',
                    body: {
                        fcm_token: 'string, required',
                        device_type: 'enum: android|ios|web, required',
                        device_id: 'string, optional'
                    }
                },
                {
                    remove_token: '/api/v1/notifications/remove-token',
                    description: 'Remove FCM token',
                    token: 'required',
                    body: {
                        fcm_token: 'string, required'
                    }
                }
            ]
        }
    });
});


// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/v1/notifications
 * @desc    Get user notifications
 * @access  Protected
 */
router.get(
    '/',
    [
        query('category').optional().isIn(['ALL', 'SYSTEM', 'GAME', 'OFFER', 'REMINDER', 'INFO']),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('offset').optional().isInt({ min: 0 }),
    ],
    validate,
    notificationController.getNotifications
);

/**
 * @route   GET /api/v1/notifications/unread-count
 * @desc    Get unread notification count
 * @access  Protected
 */
router.get(
    '/unread-count',
    notificationController.getUnreadCount
);

/**
 * @route   PUT /api/v1/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Protected
 */
router.put(
    '/:id/read',
    [
        param('id').isUUID(),
    ],
    validate,
    notificationController.markAsRead
);

/**
 * @route   PUT /api/v1/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Protected
 */
router.put(
    '/read-all',
    notificationController.markAllAsRead
);

/**
 * @route   DELETE /api/v1/notifications/:id
 * @desc    Delete notification
 * @access  Protected
 */
router.delete(
    '/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    notificationController.deleteNotification
);

/**
 * @route   POST /api/v1/notifications/register-token
 * @desc    Register FCM token
 * @access  Protected
 */
router.post(
    '/register-token',
    [
        body('fcm_token').notEmpty().withMessage('FCM token is required'),
        body('device_type').isIn(['android', 'ios', 'web']),
        body('device_id').optional(),
    ],
    validate,
    notificationController.registerToken
);

/**
 * @route   POST /api/v1/notifications/remove-token
 * @desc    Remove FCM token
 * @access  Protected
 */
router.post(
    '/remove-token',
    [
        body('fcm_token').notEmpty().withMessage('FCM token is required'),
    ],
    validate,
    notificationController.removeToken
);


module.exports = router;