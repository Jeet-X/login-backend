// routes/admin/quiz/index.js
const express = require('express');
const questionRoutes = require('./question.route');
const categoryRoutes = require('./category.route');
const questionSetRoutes = require('./questionSet.route');
const tournamentRoutes = require('./tournament.route');
const practiceConfigRoutes = require('./practiceConfig.route');

const router = express.Router();

router.use('/questions', questionRoutes);
router.use('/categories', categoryRoutes);
router.use('/question-sets', questionSetRoutes);
router.use('/tournaments', tournamentRoutes);
router.use('/practice-config', practiceConfigRoutes);


module.exports = router;