

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const authRoutes = require('@/routes/auth.routes');
const userRoutes = require('@/routes/user.routes');
const referralRoutes = require('@/routes/referral.routes'); // Add this


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/referral', referralRoutes);

module.exports = router;
