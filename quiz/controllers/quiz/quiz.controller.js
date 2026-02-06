// controllers/quiz/quiz.controller.js
const quizService = require('@/services/quiz.service');
const logger = require('@/utils/logger');

class QuizController {
    /**
     * Get entry options for quiz
     */
    async getEntryOptions(req, res) {
        try {
            const userId = req.user.id;
            const { sub_category_id } = req.params;

            const options = await quizService.getEntryOptions(userId, sub_category_id);

            res.json({
                success: true,
                data: options
            });
        } catch (error) {
            logger.error('Get entry options error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Start practice mode
     */
    async startPractice(req, res) {
        try {
            const userId = req.user.id;
            const { sub_category_id, terms_accepted } = req.body;

            if (!terms_accepted) {
                return res.status(400).json({
                    success: false,
                    message: 'You must accept terms and conditions'
                });
            }

            const session = await quizService.startPractice(userId, sub_category_id, terms_accepted);

            res.status(201).json({
                success: true,
                message: 'Practice session started',
                data: session
            });
        } catch (error) {
            logger.error('Start practice error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Submit practice quiz
     */
    async submitPractice(req, res) {
        try {
            const userId = req.user.id;
            const { session_id } = req.params;
            const { answers, completion_time } = req.body;

            const result = await quizService.submitPractice(userId, session_id, answers, completion_time);

            res.json({
                success: true,
                message: 'Quiz submitted successfully',
                data: result
            });
        } catch (error) {
            logger.error('Submit practice error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get tournament slots
     */
    async getTournamentSlots(req, res) {
        try {
            const { sub_category_id } = req.query;
            const tournamentSlotModel = require('@/models/quiz/tournamentSlot.model');

            const slots = await tournamentSlotModel.findActiveSlots(sub_category_id);

            res.json({
                success: true,
                data: slots
            });
        } catch (error) {
            logger.error('Get tournament slots error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Join tournament
     */
    async joinTournament(req, res) {
        try {
            const userId = req.user.id;
            const { slot_id, terms_accepted } = req.body;

            if (!terms_accepted) {
                return res.status(400).json({
                    success: false,
                    message: 'You must accept terms and conditions'
                });
            }

            const result = await quizService.joinTournament(userId, slot_id, terms_accepted);

            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            logger.error('Join tournament error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Start tournament quiz
     */
    async startTournamentQuiz(req, res) {
        try {
            const userId = req.user.id;
            const { session_id } = req.params;

            const quiz = await quizService.startTournamentQuiz(userId, session_id);

            res.json({
                success: true,
                data: quiz
            });
        } catch (error) {
            logger.error('Start tournament quiz error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Submit tournament quiz
     */
    async submitTournament(req, res) {
        try {
            const userId = req.user.id;
            const { session_id } = req.params;
            const { answers, completion_time } = req.body;

            const result = await quizService.submitTournament(userId, session_id, answers, completion_time);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            logger.error('Submit tournament error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get user quiz history
     */
    async getHistory(req, res) {
        try {
            const userId = req.user.id;
            const { mode, limit, offset } = req.query;

            const history = await quizService.getUserHistory(
                userId,
                mode,
                parseInt(limit) || 20,
                parseInt(offset) || 0
            );

            res.json({
                success: true,
                data: history
            });
        } catch (error) {
            logger.error('Get history error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new QuizController();