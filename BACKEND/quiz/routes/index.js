

// ==========================================
// src/routes/index.js (Route aggregator)
// ==========================================
const express = require('express');
const quizRoutes = require('@/routes/quiz.routes');
const categoryRoutes = require('./category.route');

const router = express.Router();

router.use('/quiz', quizRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
