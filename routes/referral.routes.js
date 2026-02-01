const express = require('express');
const { body, query } = require('express-validator');
const referralController = require('@/controllers/referral/referral.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');

const router = express.Router();


//Public Routes

router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Referral routes are working',
        timestamp: new Date().toISOString(),
        token: 'required in Authorization header as Bearer token',
        available_endpoints: {
            GET: [
                {
                    summary: '/api/v1/referral/summary',
                    description: 'Get referral summary (code, stats, earnings)',
                    token: "required",

                },
                {
                    history: '/api/v1/referral/history',
                    description: 'Get referral history',
                    token: "required",
                    body: {
                        access: 'Protected',
                        body: {
                            limit: "optional, integer, max 100"

                        }
                    }
                },
                {
                    wallet: '/api/v1/referral/wallet',
                    description: 'Get wallet balance and recent transactions',
                    token: "required",
                },
                {
                    transactions: '/api/v1/referral/wallet/transactions',
                    description: 'Get wallet transaction history',
                    token: "required",
                    query: {
                        limit: "optional, integer, max 100"
                    }
                }
            ],
            POST: [
                {

                    validate: '/api/v1/referral/validate',
                    description: 'Validate referral code',
                    body: {
                        referral_code: "string, required"
                    }
                },
                {
                    apply: '/api/v1/referral/apply',
                    description: 'Apply referral code (during registration)',
                    body: {
                        referral_code: "string, required",
                        new_user_id: "UUID, required"
                    }
                }
            ],
        },
    });
});

/**
 * @route   POST /api/v1/referral/validate
 * @desc    Validate referral code
 * @access  Public
 */
router.post(
    '/validate',
    [
        body('referral_code')
            .notEmpty().withMessage('Referral code is required')
            .trim()
            .toUpperCase(),
    ],
    validate,
    referralController.validateCode
);

/**
 * @route   POST /api/v1/referral/apply
 * @desc    Apply referral code (during registration)
 * @access  Public (but requires valid user context)
 */
router.post(
    '/apply',
    [
        body('referral_code')
            .notEmpty().withMessage('Referral code is required')
            .trim()
            .toUpperCase(),
        body('new_user_id')
            .notEmpty().withMessage('New user ID is required')
    ],
    validate,
    referralController.applyCode
);


//Private Routes 

router.use(authenticateToken)
/**
 * @route   GET /api/v1/referral/summary
 * @desc    Get referral summary (code, stats, earnings)
 * @access  Protected
 */
router.get(
    '/summary',
    referralController.getSummary
);

/**
 * @route   GET /api/v1/referral/history
 * @desc    Get referral history
 * @access  Protected
 */
router.get(
    '/history',
    [
        query('limit').optional().isInt({ min: 1, max: 100 }),
    ],
    validate,
    referralController.getHistory
);

/**
 * @route   GET /api/v1/referral/wallet
 * @desc    Get wallet balance and recent transactions
 * @access  Protected
 */
router.get(
    '/wallet',
    referralController.getWalletBalance
);

/**
 * @route   GET /api/v1/referral/wallet/transactions
 * @desc    Get wallet transaction history
 * @access  Protected
 */
router.get(
    '/wallet/transactions',
    [
        query('limit').optional().isInt({ min: 1, max: 100 }),
    ],
    validate,
    referralController.getTransactions
);

module.exports = router;




