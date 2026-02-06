const express = require('express');
const { query, param } = require('express-validator');
const walletController = require('@/controllers/wallet/wallet.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');
const router = express.Router();


/**
 * @route   GET /api/v1/wallet/test
 * @desc    Test endpoint
 * @access  Protected
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Wallet routes are working',
        timestamp: new Date().toISOString(),
        available_endpoints: {
            GET: [
                {
                    wallet: '/api/v1/wallet',
                    description: 'Get wallet balance and summary',
                    token: 'required'
                },
                {
                    transactions: '/api/v1/wallet/transactions',
                    description: 'Get transaction history',
                    token: 'required',
                    query: {
                        limit: 'integer, optional, default 50',
                        offset: 'integer, optional, default 0',
                        type: 'string, optional (CREDIT, DEBIT, etc.)'
                    }
                },
                {
                    transaction_detail: '/api/v1/wallet/transactions/:id',
                    description: 'Get single transaction',
                    token: 'required',
                    params: { id: 'UUID, required' }
                }
            ]
        }
    });
});

// All routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/v1/wallet
 * @desc    Get wallet summary
 * @access  Protected
 */
router.get('/', walletController.getWallet);

/**
 * @route   GET /api/v1/wallet/transactions
 * @desc    Get transaction history
 * @access  Protected
 */
router.get(
    '/transactions',
    [
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('offset').optional().isInt({ min: 0 }),
        query('type').optional().isString(),
    ],
    validate,
    walletController.getTransactions
);

/**
 * @route   GET /api/v1/wallet/transactions/:id
 * @desc    Get transaction by ID
 * @access  Protected
 */
router.get(
    '/transactions/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    walletController.getTransaction
);

module.exports = router;