// ==========================================
// src/routes/auth.routes.js - COMPLETE VERSION
// ==========================================
const express = require('express');
const { body } = require('express-validator');
const authController = require('@/controllers/auth.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const rateLimiter = require('@/middleware/rateLimiter.middleware');
const { validate } = require('@/utils/validators');

const router = express.Router();

// ==========================================
// MOBILE OTP ROUTES
// ==========================================

/**
 * @route   POST /api/v1/auth/send-mobile-otp
 * @desc    Send OTP to mobile number
 * @access  Public
 */
router.post(
    '/send-mobile-otp',
    rateLimiter.otpLimiter,
    [
        body('mobile')
            .notEmpty().withMessage('Mobile number is required')
            .isMobilePhone().withMessage('Invalid mobile number'),
        body('country_code')
            .notEmpty().withMessage('Country code is required')
            .matches(/^\+\d{1,4}$/).withMessage('Invalid country code format'),
    ],
    validate,
    authController.sendMobileOTP
);

/**
 * @route   POST /api/v1/auth/verify-mobile-otp
 * @desc    Verify mobile OTP
 * @access  Public
 */
router.post(
    '/verify-mobile-otp',
    [
        body('mobile')
            .notEmpty().withMessage('Mobile number is required'),
        body('country_code')
            .notEmpty().withMessage('Country code is required'),
        body('otp')
            .notEmpty().withMessage('OTP is required')
            .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
        // body('verification_id')
        //     .notEmpty().withMessage('Verification ID is required'),
    ],
    validate,
    authController.verifyMobileOTP
);

// ==========================================
// EMAIL OTP ROUTES
// ==========================================

/**
 * @route   POST /api/v1/auth/send-email-otp
 * @desc    Send OTP to email
 * @access  Public
 */
router.post(
    '/send-email-otp',
    rateLimiter.otpLimiter,
    [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
    ],
    validate,
    authController.sendEmailOTP
);

/**
 * @route   POST /api/v1/auth/verify-email-otp
 * @desc    Verify email OTP
 * @access  Public
 */
router.post(
    '/verify-email-otp',
    [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
        body('otp')
            .notEmpty().withMessage('OTP is required')
            .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
    ],
    validate,
    authController.verifyEmailOTP
);

// ==========================================
// PASSWORD VALIDATION ROUTE
// ==========================================

/**
 * @route   POST /api/v1/auth/validate-password
 * @desc    Validate password strength
 * @access  Public
 */
router.post(
    '/validate-password',
    rateLimiter.passwordValidationLimiter,
    [
        body('password')
            .notEmpty().withMessage('Password is required'),
    ],
    validate,
    authController.validatePassword
);

// ==========================================
// REGISTRATION ROUTE
// ==========================================

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post(
    '/register',
    [
        body('full_name')
            .notEmpty().withMessage('Full name is required')
            .trim()
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters'),
        body('mobile')
            .notEmpty().withMessage('Mobile number is required')
            .isMobilePhone().withMessage('Invalid mobile number'),
        body('country_code')
            .notEmpty().withMessage('Country code is required')
            .matches(/^\+\d{1,4}$/).withMessage('Invalid country code format'),
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters'),
        body('confirm_password')
            .notEmpty().withMessage('Confirm password is required')
            .custom((value, { req }) => value === req.body.password)
            .withMessage('Passwords do not match'),
        body('firebase_uid')
            .optional()
            .notEmpty().withMessage('Firebase UID is required'),
        body('referral_code')
            .optional()
            .trim()
            .isLength({ max: 50 }).withMessage('Invalid referral code'),
    ],
    validate,
    authController.register
);

// ==========================================
// LOGIN ROUTES
// ==========================================

/**
 * @route   POST /api/v1/auth/login/email
 * @desc    Login with email and password
 * @access  Public
 */
router.post(
    '/login/email',
    rateLimiter.loginLimiter,
    [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required'),
    ],
    validate,
    authController.loginWithEmail
);

/**
 * @route   POST /api/v1/auth/login/mobile
 * @desc    Login with mobile OTP
 * @access  Public
 */
router.post(
    '/login/mobile',
    rateLimiter.loginLimiter,
    [
        body('mobile')
            .notEmpty().withMessage('Mobile number is required'),
        body('country_code')
            .notEmpty().withMessage('Country code is required')
        // body('otp')
        //     .notEmpty().withMessage('OTP is required')
        //     .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
        // body('verification_id')
        //     .notEmpty().withMessage('Verification ID is required'),
    ],
    validate,
    authController.loginWithMobile
);

// ==========================================
// FORGOT PASSWORD ROUTES
// ==========================================

/**
 * @route   POST /api/v1/auth/forgot-password/email
 * @desc    Request password reset via email
 * @access  Public
 */
router.post(
    '/forgot-password/email',
    rateLimiter.otpLimiter,
    [
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
    ],
    validate,
    authController.forgotPasswordEmail
);

/**
 * @route   POST /api/v1/auth/forgot-password/mobile
 * @desc    Request password reset via mobile OTP
 * @access  Public
 */
router.post(
    '/forgot-password/mobile',
    rateLimiter.otpLimiter,
    [
        body('mobile')
            .notEmpty().withMessage('Mobile number is required'),
        body('country_code')
            .notEmpty().withMessage('Country code is required'),
    ],
    validate,
    authController.forgotPasswordMobile
);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password after OTP verification
 * @access  Public
 */
router.post(
    '/reset-password',
    [
        body('new_password')
            .notEmpty().withMessage('New password is required')
            .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters'),
        body('confirm_password')
            .notEmpty().withMessage('Confirm password is required')
            .custom((value, { req }) => value === req.body.new_password)
            .withMessage('Passwords do not match'),
        body('email')
            .optional()
            .isEmail().withMessage('Invalid email address')
            .normalizeEmail(),
        body('mobile')
            .optional(),
        body('country_code')
            .optional(),
    ],
    validate,
    authController.resetPassword
);

// ==========================================
// TOKEN MANAGEMENT ROUTES
// ==========================================

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
    '/refresh-token',
    [
        body('refresh_token')
            .notEmpty().withMessage('Refresh token is required'),
    ],
    validate,
    authController.refreshToken
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Protected
 */
router.post(
    '/logout',
    authenticateToken,
    authController.logout
);

// ==========================================
// TEST ROUTE (Remove in production)
// ==========================================

/**
 * @route   GET /api/v1/auth/test
 * @desc    Test auth routes
 * @access  Public
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth routes are working',
        timestamp: new Date().toISOString(),
        available_endpoints: {
            mobile_otp: {
                send: {
                    endpoint: 'POST /v1/auth/send-mobile-otp',
                    body: {
                        "mobile": "", "country_code": ""
                    }
                },
                verify: { endpoint: 'POST /v1/auth/verify-mobile-otp', },
            },
            email_otp: {
                send: 'POST /v1/auth/send-email-otp',
                verify: 'POST /v1/auth/verify-email-otp',
            },
            password: {
                validate: { endpoint: 'POST /v1/auth/validate-password', body: { "password": "" } },
            },
            authentication: {
                register: {
                    endpoint: 'POST /v1/auth/register',
                    body: {
                        "full_name": "",
                        "mobile": "",
                        "country_code": "",
                        "email": "",
                        "password": "",
                        "confirm_password": "",
                        "referral_code": ""
                    }
                },
                login_email: {
                    endpoint: 'POST /v1/auth/login/email',
                    body: {
                        "email": "john.doe@example.com", "password": "celjajlfc"
                    }
                },
                login_mobile: {
                    endpoint: 'POST /v1/auth/login/mobile', body: {
                        "mobile": "",
                        "country_code": "",
                        "otp": "",
                        "verification_id": ""
                    }
                },
            },
            password_reset: {
                forgot_email: 'POST /v1/auth/forgot-password/email',
                // forgot_mobile: 'POST /v1/auth/forgot-password/mobile',
                reset: 'POST /v1/auth/reset-password',
            },
            token: {
                refresh: 'POST /v1/auth/refresh-token',
                logout: 'POST /v1/auth/logout',
            },
        },
    });
});

module.exports = router;