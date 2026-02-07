

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const walletRoutes = require('@/routes/wallet.route');

const router = express.Router();

router.use('/wallet', walletRoutes);

module.exports = router;
