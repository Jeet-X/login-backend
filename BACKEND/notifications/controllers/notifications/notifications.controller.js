const notificationService = require('@/services/notification.service');
const notificationModel = require('@/models/notifications/notifications.model');
const fcmTokenModel = require('@/models/fcmToken/fcmToken.model');
const logger = require('@/utils/logger');

class NotificationController {
    /**
     * Get user notifications
     * GET /api/v1/notifications
     */
    async getNotifications(req, res, next) {
        try {
            const userId = req.user.id;
            const { category, limit = 50, offset = 0 } = req.query;

            let notifications;

            if (category && category !== 'ALL') {
                notifications = await notificationModel.findByCategory(
                    userId,
                    category,
                    parseInt(limit)
                );
            } else {
                notifications = await notificationModel.findByUserId(
                    userId,
                    parseInt(limit),
                    parseInt(offset)
                );
            }

            const unreadCount = await notificationModel.getUnreadCount(userId);

            res.json({
                success: true,
                data: {
                    notifications,
                    unread_count: unreadCount,
                    total: notifications.length,
                },
            });
        } catch (error) {
            logger.error('Get notifications error:', error);
            next(error);
        }
    }

    /**
     * Get unread count
     * GET /api/v1/notifications/unread-count
     */
    async getUnreadCount(req, res, next) {
        try {
            const userId = req.user.id;
            const count = await notificationModel.getUnreadCount(userId);

            res.json({
                success: true,
                data: {
                    unread_count: count,
                },
            });
        } catch (error) {
            logger.error('Get unread count error:', error);
            next(error);
        }
    }

    /**
     * Mark notification as read
     * PUT /api/v1/notifications/:id/read
     */
    async markAsRead(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            const notification = await notificationModel.markAsRead(id, userId);

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    error: 'NOTIFICATION_NOT_FOUND',
                    message: 'Notification not found',
                });
            }

            res.json({
                success: true,
                message: 'Notification marked as read',
                data: notification,
            });
        } catch (error) {
            logger.error('Mark as read error:', error);
            next(error);
        }
    }

    /**
     * Mark all as read
     * PUT /api/v1/notifications/read-all
     */
    async markAllAsRead(req, res, next) {
        try {
            const userId = req.user.id;
            const count = await notificationModel.markAllAsRead(userId);

            res.json({
                success: true,
                message: `${count} notifications marked as read`,
                data: {
                    count,
                },
            });
        } catch (error) {
            logger.error('Mark all as read error:', error);
            next(error);
        }
    }

    /**
     * Delete notification
     * DELETE /api/v1/notifications/:id
     */
    async deleteNotification(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            const notification = await notificationModel.deleteNotification(id, userId);

            if (!notification) {
                return res.status(404).json({
                    success: false,
                    error: 'NOTIFICATION_NOT_FOUND',
                    message: 'Notification not found',
                });
            }

            res.json({
                success: true,
                message: 'Notification deleted',
            });
        } catch (error) {
            logger.error('Delete notification error:', error);
            next(error);
        }
    }

    /**
     * Register FCM token
     * POST /api/v1/notifications/register-token
     */
    async registerToken(req, res, next) {
        try {
            const userId = req.user.id;
            const { fcm_token, device_type, device_id } = req.body;

            await fcmTokenModel.saveToken(userId, fcm_token, device_type, device_id);

            logger.info(`FCM token registered for user ${userId}`);

            res.json({
                success: true,
                message: 'FCM token registered successfully',
            });
        } catch (error) {
            logger.error('Register token error:', error);
            next(error);
        }
    }

    /**
     * Remove FCM token
     * POST /api/v1/notifications/remove-token
     */
    async removeToken(req, res, next) {
        try {
            const userId = req.user.id;
            const { fcm_token } = req.body;

            await fcmTokenModel.removeToken(userId, fcm_token);

            res.json({
                success: true,
                message: 'FCM token removed successfully',
            });
        } catch (error) {
            logger.error('Remove token error:', error);
            next(error);
        }
    }
}

module.exports = new NotificationController();