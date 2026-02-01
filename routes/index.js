

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const authRoutes = require('@/routes/auth.routes');
const userRoutes = require('@/routes/user.routes');
const referralRoutes = require('@/routes/referral.routes'); // Add this
const notificationRoutes = require('@/routes/notifications.route');
const walletRoutes = require('@/routes/wallet.route');
const quizRoutes = require('@/routes/quiz.routes');
const categoryRoutes = require('./category.route');

const router = express.Router();

router.use('/notifications', notificationRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/referral', referralRoutes);
router.use('/wallet', walletRoutes);
router.use('/quiz', quizRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
