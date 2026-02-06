const notificationService = require('../../services/notification.service');
const campaignModel = require('@/models/campaign/campaign.model');
const logger = require('../../utils/logger');

class AdminNotificationController {
    /**
     * Create notification campaign
     * POST /admin/api/v1/notifications
     */
    async createCampaign(req, res, next) {
        try {
            const {
                title,
                message,
                category,
                target_type,
                target_segment,
                target_user_ids,
                screen_redirect,
                data,
                schedule_at,
            } = req.body;

            const adminId = req.user.id; // Admin user ID

            // Create campaign
            const campaign = await campaignModel.create({
                title,
                message,
                category,
                target_type,
                target_segment,
                screen_redirect,
                data,
                schedule_at,
                created_by: adminId,
            });

            // If custom targeting, add target users
            if (target_type === 'CUSTOM' && target_user_ids && target_user_ids.length > 0) {
                await campaignModel.addTargets(campaign.id, target_user_ids);
            }

            // If not scheduled, process immediately
            if (!schedule_at || new Date(schedule_at) <= new Date()) {
                // Process asynchronously
                // eslint-disable-next-line no-undef
                setImmediate(async () => {
                    try {
                        await notificationService.processCampaign(campaign.id);
                    } catch (error) {
                        logger.error('Campaign processing error:', error);
                    }
                });
            }

            logger.info(`Campaign created by admin ${adminId}: ${campaign.id}`);

            res.status(201).json({
                success: true,
                message: schedule_at ? 'Campaign scheduled successfully' : 'Campaign created and processing',
                data: campaign,
            });
        } catch (error) {
            logger.error('Create campaign error:', error);
            next(error);
        }
    }

    /**
     * Get all campaigns
     * GET /admin/api/v1/notifications
     */
    async getCampaigns(req, res, next) {
        try {
            const { limit = 50, offset = 0 } = req.query;

            const campaigns = await campaignModel.findAll(
                parseInt(limit),
                parseInt(offset)
            );

            res.json({
                success: true,
                data: campaigns,
                total: campaigns.length,
            });
        } catch (error) {
            logger.error('Get campaigns error:', error);
            next(error);
        }
    }

    /**
     * Get campaign by ID
     * GET /admin/api/v1/notifications/:id
     */
    async getCampaign(req, res, next) {
        try {
            const { id } = req.params;

            const campaign = await campaignModel.findById(id);

            if (!campaign) {
                return res.status(404).json({
                    success: false,
                    error: 'CAMPAIGN_NOT_FOUND',
                    message: 'Campaign not found',
                });
            }

            res.json({
                success: true,
                data: campaign,
            });
        } catch (error) {
            logger.error('Get campaign error:', error);
            next(error);
        }
    }

    /**
     * Cancel campaign
     * PUT /admin/api/v1/notifications/:id/cancel
     */
    async cancelCampaign(req, res, next) {
        try {
            const { id } = req.params;

            const campaign = await campaignModel.findById(id);

            if (!campaign) {
                return res.status(404).json({
                    success: false,
                    error: 'CAMPAIGN_NOT_FOUND',
                    message: 'Campaign not found',
                });
            }

            if (campaign.status === 'SENT') {
                return res.status(400).json({
                    success: false,
                    error: 'CAMPAIGN_ALREADY_SENT',
                    message: 'Cannot cancel a campaign that has already been sent',
                });
            }

            await campaignModel.updateStatus(id, 'CANCELLED');

            logger.info(`Campaign cancelled: ${id}`);

            res.json({
                success: true,
                message: 'Campaign cancelled successfully',
            });
        } catch (error) {
            logger.error('Cancel campaign error:', error);
            next(error);
        }
    }

    /**
     * Send test notification
     * POST /admin/api/v1/notifications/test
     */
    async sendTestNotification(req, res, next) {
        try {
            const { user_id, title, message, category } = req.body;

            await notificationService.sendToUser(user_id, {
                title,
                message,
                category: category || 'INFO',
                delivery_mode: 'BOTH',
            });

            res.json({
                success: true,
                message: 'Test notification sent',
            });
        } catch (error) {
            logger.error('Send test notification error:', error);
            next(error);
        }
    }
}

module.exports = new AdminNotificationController();