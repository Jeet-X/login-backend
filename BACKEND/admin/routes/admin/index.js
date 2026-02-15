const express = require('express');
const adminNotificationRoutes = require('@/routes/admin/notifications.route');
const adminSchedulerRoutes = require('@/routes/admin/scheduler.route');
const adminAuthRoutes = require('@/routes/admin/auth.route');
const quizRoutes = require('@/routes/admin/quiz');

const router = express.Router();

router.use('/notifications', adminNotificationRoutes);
router.use('/scheduler', adminSchedulerRoutes);
router.use('/auth', adminAuthRoutes);
router.use('/quiz', quizRoutes);
module.exports = router;