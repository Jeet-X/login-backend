

// ==========================================
// Optional: Admin endpoint to trigger scheduler manually
// ==========================================
// src/controllers/admin/scheduler.controller.js
const notificationScheduler = require('../../jobs/notificationScheduler');
const logger = require('../../utils/logger');

class SchedulerController {
    async getStatus(req, res, next) {
        try {
            const status = notificationScheduler.getStatus();

            res.json({
                success: true,
                data: {
                    schedulers: status,
                    total: status.length,
                    running: status.filter(s => s.running).length,
                },
            });
        } catch (error) {
            logger.error('Get scheduler status error:', error);
            next(error);
        }
    }

    async triggerTournamentReminders(req, res, next) {
        try {
            // Manually trigger the job
            await notificationScheduler.scheduleTournamentReminders();

            res.json({
                success: true,
                message: 'Tournament reminders triggered',
            });
        } catch (error) {
            logger.error('Trigger tournament reminders error:', error);
            next(error);
        }
    }
}

module.exports = new SchedulerController();