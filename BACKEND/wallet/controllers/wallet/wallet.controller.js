const walletService = require('@/services/wallet.service');
const logger = require('@/utils/logger');

class WalletController {
    /**
     * Get wallet balance and summary
     */
    async getWallet(req, res) {
        try {
            const userId = req.user.id;
            const summary = await walletService.getWalletSummary(userId);

            res.json({
                success: true,
                data: summary
            });
        } catch (error) {
            logger.error('Get wallet error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get transaction history
     */
    async getTransactions(req, res) {
        try {
            const userId = req.user.id;
            const { limit, offset, type } = req.query;

            const result = await walletService.getTransactionHistory(userId, {
                limit: parseInt(limit) || 50,
                offset: parseInt(offset) || 0,
                type
            });

            res.json({
                success: true,
                data: result.transactions,
                pagination: result.pagination
            });
        } catch (error) {
            logger.error('Get transactions error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get transaction by ID
     */
    async getTransaction(req, res) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            const transactionModel = require('@/models/wallet/transaction.model');
            const transaction = await transactionModel.findById(id);

            if (!transaction) {
                return res.status(404).json({
                    success: false,
                    message: 'Transaction not found'
                });
            }

            if (transaction.user_id !== userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }

            res.json({
                success: true,
                data: transaction
            });
        } catch (error) {
            logger.error('Get transaction error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new WalletController();