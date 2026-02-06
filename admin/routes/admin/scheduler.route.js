const express = require('express');
const schedulerController = require('@/controllers/admin/scheduler.controller');
const { authenticateToken, isAdmin } = require('@/middleware/auth.middleware');

const router = express.Router();

/**
 * @route   GET /admin/api/v1/scheduler/test
 * @desc    Test endpoint - shows available admin scheduler endpoints
 * @access  Admin
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Admin scheduler routes are working',
        timestamp: new Date().toISOString(),
        token: 'required in Authorization header as Bearer token',
        access: 'Admin role required',
        available_endpoints: {
            GET: [
                {
                    status: '/admin/api/v1/scheduler/status',
                    description: 'Get scheduler status and running jobs',
                    access: 'Admin',
                    token: 'required'
                }
            ],
            POST: [
                {
                    trigger_tournaments: '/admin/api/v1/scheduler/trigger/tournaments',
                    description: 'Manually trigger tournament reminders',
                    access: 'Admin',
                    token: 'required',
                    note: 'Triggers immediate execution of tournament reminder job'
                }
            ]
        },
        scheduler_info: {
            description: 'Scheduler manages automated tasks and cron jobs',
            features: [
                'Tournament reminders',
                'Scheduled notifications',
                'Background job processing'
            ]
        }
    });
});

router.use(authenticateToken);
// router.use(isAdmin);

/**
 * @route   GET /admin/api/v1/scheduler/status
 * @desc    Get scheduler status
 * @access  Admin
 */
router.get('/status', schedulerController.getStatus);

/**
 * @route   POST /admin/api/v1/scheduler/trigger/tournaments
 * @desc    Manually trigger tournament reminders
 * @access  Admin
 */
router.post('/trigger/tournaments', schedulerController.triggerTournamentReminders);

module.exports = router;
