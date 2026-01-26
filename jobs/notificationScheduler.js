// const cron = require('node-cron');
// const notificationService = require('@/services/notification.service');
// const db = require('@/config/database');
// const logger = require('@/utils/logger');

// // Run every 5 minutes
// cron.schedule('*/5 * * * *', async () => {
//     try {
//         // Find tournaments ending in next 30 minutes
//         const query = `
//       SELECT t.*, tp.user_id
//       FROM tournaments t
//       JOIN tournament_participants tp ON t.id = tp.tournament_id
//       WHERE t.end_time > NOW()
//       AND t.end_time < NOW() + INTERVAL '30 minutes'
//       AND t.notification_sent = FALSE
//     `;

//         const result = await db.query(query);

//         for (const row of result.rows) {
//             await notificationService.sendSystemNotification(
//                 row.user_id,
//                 'TOURNAMENT_ENDING',
//                 {
//                     tournamentName: row.name,
//                     minutesLeft: 30,
//                 }
//             );
//         }

//         if (result.rows.length > 0) {
//             await db.query('UPDATE tournaments SET notification_sent = TRUE WHERE ...');
//             logger.info(`Sent ${result.rows.length} tournament reminders`);
//         }
//     } catch (error) {
//         logger.error('Tournament reminder scheduler error:', error);
//     }
// });


const cron = require('node-cron');
const notificationService = require('../services/notification.service');
const campaignModel = require('@/models/campaign/campaign.model');
const db = require('../config/database');
const logger = require('../utils/logger');

class NotificationScheduler {
    constructor() {
        this.jobs = [];
    }

    /**
     * Initialize all scheduled jobs
     */
    init() {
        logger.info('🕐 Initializing notification schedulers...');

        // 1. Tournament ending reminders - Every 5 minutes
        this.scheduleTournamentReminders();

        // 2. Process scheduled campaigns - Every minute
        this.scheduleProcessCampaigns();

        // 3. Clean expired notifications - Daily at 2 AM
        this.scheduleCleanupExpiredNotifications();

        // 4. Clean inactive FCM tokens - Daily at 3 AM
        this.scheduleCleanupFCMTokens();

        // 5. Weekly results notifications - Every Sunday at 6 PM
        this.scheduleWeeklyResults();

        logger.info('✅ Notification schedulers initialized');
    }

    /**
     * Tournament ending reminders
     */
    scheduleTournamentReminders() {
        // Run every 5 minutes
        const job = cron.schedule('*/5 * * * *', async () => {
            try {
                logger.debug('Running tournament reminder scheduler...');

                // Find tournaments ending in next 30 minutes
                const query = `
          SELECT DISTINCT t.id, t.name, t.end_time, tp.user_id
          FROM tournaments t
          INNER JOIN tournament_participants tp ON t.id = tp.tournament_id
          WHERE t.status = 'ACTIVE'
          AND t.end_time > NOW()
          AND t.end_time <= NOW() + INTERVAL '30 minutes'
          AND t.reminder_sent = FALSE
        `;

                const result = await db.query(query);

                if (result.rows.length > 0) {
                    const userNotifications = new Map();

                    // Group by user
                    result.rows.forEach((row) => {
                        if (!userNotifications.has(row.user_id)) {
                            userNotifications.set(row.user_id, []);
                        }
                        userNotifications.get(row.user_id).push(row);
                    });

                    // Send notifications
                    for (const [userId, tournaments] of userNotifications) {
                        for (const tournament of tournaments) {
                            const minutesLeft = Math.ceil(
                                (new Date(tournament.end_time) - new Date()) / (1000 * 60)
                            );

                            await notificationService.sendSystemNotification(
                                userId,
                                'TOURNAMENT_ENDING',
                                {
                                    tournamentId: tournament.id,
                                    tournamentName: tournament.name,
                                    minutesLeft,
                                }
                            );
                        }
                    }

                    // Mark tournaments as reminded
                    const tournamentIds = [...new Set(result.rows.map((r) => r.id))];
                    await db.query(
                        'UPDATE tournaments SET reminder_sent = TRUE WHERE id = ANY($1)',
                        [tournamentIds]
                    );

                    logger.info(
                        `Sent ${result.rows.length} tournament ending notifications`
                    );
                }
            } catch (error) {
                logger.error('Tournament reminder scheduler error:', error);
            }
        });

        this.jobs.push({ name: 'tournamentReminders', job });
        logger.info('✓ Tournament reminder scheduler registered (every 5 min)');
    }

    /**
     * Process scheduled campaigns
     */
    scheduleProcessCampaigns() {
        // Run every minute
        const job = cron.schedule('* * * * *', async () => {
            try {
                logger.debug('Checking for scheduled campaigns...');

                // Find campaigns that should be sent now
                const query = `
          SELECT * FROM admin_notification_campaigns
          WHERE status = 'SCHEDULED'
          AND schedule_at <= NOW()
          ORDER BY schedule_at ASC
        `;

                const result = await db.query(query);
                for (const campaign of result.rows) {
                    try {
                        logger.info(`Processing scheduled campaign: ${campaign.id}`);
                        await notificationService.processCampaign(campaign.id);
                    } catch (error) {
                        logger.error(`Failed to process campaign ${campaign.id}:`, error);
                    }
                }

                if (result.rows.length > 0) {
                    logger.info(`Processed ${result.rows.length} scheduled campaigns`);
                }
            } catch (error) {
                logger.error('Process campaigns scheduler error:', error);
            }
        });

        this.jobs.push({ name: 'processCampaigns', job });
        logger.info('✓ Campaign processor registered (every 1 min)');
    }

    /**
     * Clean up expired notifications
     */
    scheduleCleanupExpiredNotifications() {
        // Run daily at 2:00 AM
        const job = cron.schedule('0 2 * * *', async () => {
            try {
                logger.info('Running expired notifications cleanup...');

                const notificationModel = require('../models/notification.model');
                const count = await notificationModel.deleteExpired();

                logger.info(`Deleted ${count} expired notifications`);
            } catch (error) {
                logger.error('Cleanup expired notifications error:', error);
            }
        });

        this.jobs.push({ name: 'cleanupNotifications', job });
        logger.info('✓ Notification cleanup scheduled (daily 2:00 AM)');
    }

    /**
     * Clean up inactive FCM tokens
     */
    scheduleCleanupFCMTokens() {
        // Run daily at 3:00 AM
        const job = cron.schedule('0 3 * * *', async () => {
            try {
                logger.info('Running inactive FCM tokens cleanup...');

                const fcmTokenModel = require('../models/fcmToken.model');
                const count = await fcmTokenModel.cleanupInactiveTokens(30);

                logger.info(`Deleted ${count} inactive FCM tokens`);
            } catch (error) {
                logger.error('Cleanup FCM tokens error:', error);
            }
        });

        this.jobs.push({ name: 'cleanupFCMTokens', job });
        logger.info('✓ FCM token cleanup scheduled (daily 3:00 AM)');
    }

    /**
     * Weekly results notifications
     */
    scheduleWeeklyResults() {
        // Run every Sunday at 6:00 PM
        const job = cron.schedule('0 18 * * 0', async () => {
            try {
                logger.info('Running weekly results notifications...');

                // Get all active users
                const usersQuery = 'SELECT id FROM users WHERE status = \'ACTIVE\'';
                const users = await db.query(usersQuery);

                for (const user of users.rows) {
                    await notificationService.sendSystemNotification(
                        user.id,
                        'WEEKLY_RESULTS',
                        {
                            message: 'Your weekly game results are ready! Check your performance.',
                        }
                    );
                }

                logger.info(
                    `Sent weekly results to ${users.rows.length} users`
                );
            } catch (error) {
                logger.error('Weekly results scheduler error:', error);
            }
        });

        this.jobs.push({ name: 'weeklyResults', job });
        logger.info('✓ Weekly results scheduled (Sunday 6:00 PM)');
    }

    /**
     * Stop all schedulers
     */
    stopAll() {
        logger.info('Stopping all notification schedulers...');
        this.jobs.forEach((job) => {
            job.job.stop();
            logger.info(`✓ Stopped: ${job.name}`);
        });
        this.jobs = [];
    }

    /**
     * Get status of all jobs
     */
    getStatus() {
        return this.jobs.map((job) => ({
            name: job.name,
            running: job.job.running,
        }));
    }
}

// Export singleton instance
const scheduler = new NotificationScheduler();
module.exports = scheduler;

