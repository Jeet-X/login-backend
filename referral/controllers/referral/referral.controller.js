const referralService = require('@/services/referral.service');
const walletModel = require('@/models/wallet/wallet.model');
const logger = require('@/utils/logger');

/**
 * Helper: Get error message
 */
function getErrorMessage(errorCode) {
    const messages = {
        INVALID_CODE: 'Invalid referral code',
        REFERRER_BLOCKED: 'Referrer account is blocked',
        SELF_REFERRAL_NOT_ALLOWED: 'You cannot use your own referral code',
        REFERRAL_ALREADY_APPLIED: 'Referral code already applied',
    };

    return messages[errorCode] || 'An error occurred';
}
class ReferralController {



    /**
     * Get referral summary
     * GET /api/v1/referral/summary
     */
    async getSummary(req, res, next) {
        try {
            const userId = req.user.id;

            const summary = await referralService.getReferralSummary(userId);

            res.json({
                success: true,
                data: summary,
            });
        } catch (error) {
            logger.error('Get referral summary error:', error);
            next(error);
        }
    }

    /**
     * Validate referral code
     * POST /api/v1/referral/validate
     */
    async validateCode(req, res, next) {
        try {
            const { referral_code } = req.body;

            if (!referral_code) {
                return res.status(400).json({
                    success: false,
                    error: 'REFERRAL_CODE_REQUIRED',
                    message: 'Referral code is required',
                });
            }

            const result = await referralService.validateReferralCode(referral_code);

            if (!result.valid) {
                return res.status(400).json({
                    success: false,
                    error: result.error,
                    message: getErrorMessage(result.error),
                });
            }

            res.json({
                success: true,
                valid: true,
                referrer_user_id: result.referrer_user_id,
            });
        } catch (error) {
            logger.error('Validate referral code error:', error);
            next(error);
        }
    }

    /**
     * Apply referral code (called during registration)
     * POST /api/v1/referral/apply
     */
    async applyCode(req, res, next) {
        try {
            const { referral_code, new_user_id } = req.body;
            if (!referral_code || !new_user_id) {
                return res.status(400).json({
                    success: false,
                    error: 'MISSING_PARAMETERS',
                    message: 'Referral code and user ID are required',
                });
            }

            // Get IP and device fingerprint from request
            const ipAddress = req.ip || req.connection.remoteAddress;
            const deviceFingerprint = req.headers['x-device-fingerprint'] || null;

            const result = await referralService.applyReferralCode(
                referral_code,
                new_user_id,
                ipAddress,
                deviceFingerprint
            );
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    error: result.error,
                    message: getErrorMessage(result.error),
                });
            }

            await referralService.processReferralEligibility(new_user_id, 'FIRST_WALLET_ADD')

            res.json({
                success: true,
                status: result.status,
                reward_pending: result.reward_pending,
                message: 'Referral code applied successfully. Rewards will be credited after eligibility is met.',
            });
        } catch (error) {
            logger.error('Apply referral code error:', error);
            next(error);
        }
    }

    /**
     * Get referral history
     * GET /api/v1/referral/history
     */
    async getHistory(req, res, next) {
        try {
            const userId = req.user.id;
            const limit = parseInt(req.query.limit) || 50;

            const history = await referralService.getReferralHistory(userId, limit);

            res.json({
                success: true,
                data: history,
                count: history.length,
            });
        } catch (error) {
            logger.error('Get referral history error:', error);
            next(error);
        }
    }

    /**
     * Get wallet balance
     * GET /api/v1/referral/wallet
     */
    async getWalletBalance(req, res, next) {
        try {
            const userId = req.user.id;

            const wallet = await walletModel.findByUserId(userId);
            const transactions = await walletModel.getTransactions(userId, 10);

            res.json({
                success: true,
                data: {
                    coin_balance: wallet ? wallet.coin_balance : 0,
                    recent_transactions: transactions,
                },
            });
        } catch (error) {
            logger.error('Get wallet balance error:', error);
            next(error);
        }
    }

    /**
     * Get wallet transactions
     * GET /api/v1/referral/wallet/transactions
     */
    async getTransactions(req, res, next) {
        try {
            const userId = req.user.id;
            const limit = parseInt(req.query.limit) || 50;

            const transactions = await walletModel.getTransactions(userId, limit);

            res.json({
                success: true,
                data: transactions,
                count: transactions.length,
            });
        } catch (error) {
            logger.error('Get wallet transactions error:', error);
            next(error);
        }
    }


}

module.exports = new ReferralController();