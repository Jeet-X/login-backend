

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const notificationRoutes = require('@/routes/notifications.route');

const router = express.Router();

router.use('/notifications', notificationRoutes);

module.exports = router;
