

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const authRoutes = require('@/routes/auth.routes');
const userRoutes = require('@/routes/user.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
