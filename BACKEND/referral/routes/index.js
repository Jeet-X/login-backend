

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const referralRoutes = require('@/routes/referral.routes'); // Add this

const router = express.Router();

router.use('/referral', referralRoutes);

module.exports = router;
