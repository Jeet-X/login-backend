

// ==========================================
// src/routes/user.routes.js
// ==========================================
const express = require('express');
const { body } = require('express-validator');
const userController = require('@/controllers/user/user.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');

const router = express.Router();

// All user routes require authentication
// router.use(authenticateToken);

// Get user profile
router.get('/profile', authenticateToken, userController.getProfile);

// Update user profile
router.put(
    '/profile',
    authenticateToken,
    [
        body('full_name').optional().trim().notEmpty(),
    ],
    validate,
    userController.updateProfile
);

// Delete account
router.delete('/account', authenticateToken, userController.deleteAccount);


/**
 * @route   GET /api/v1/users/test
 * @desc    Test auth routes
 * @access  Public
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'User routes are working',
        timestamp: new Date().toISOString(),
        user_profile: {
            profile: {
                view: 'GET /profile',
                update: 'PUT /profile',
                delete: 'DELETE /profile',
            },
        },
    });
});
module.exports = router;
