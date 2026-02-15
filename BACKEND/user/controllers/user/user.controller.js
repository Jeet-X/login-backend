
const userModel = require('@/models/user/user.model');
const logger = require('@/utils/logger');
const { sanitizeUser } = require('@/utils/validators');

class UserController {
    async getProfile(req, res, next) {
        try {
            const user = await userModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: 'USER_NOT_FOUND',
                });
            }

            res.json({
                success: true,
                user: sanitizeUser(user),
            });
        } catch (error) {
            logger.error('Get profile error:', error);
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const { full_name } = req.body;
            const allowedUpdates = { full_name };

            // Filter out undefined values
            const updates = Object.keys(allowedUpdates).reduce((acc, key) => {
                if (allowedUpdates[key] !== undefined) {
                    acc[key] = allowedUpdates[key];
                }
                return acc;
            }, {});

            const user = await userModel.update(req.user.id, updates);

            res.json({
                success: true,
                message: 'Profile updated successfully',
                user: sanitizeUser(user),
            });
        } catch (error) {
            logger.error('Update profile error:', error);
            next(error);
        }
    }

    async deleteAccount(req, res, next) {
        try {
            await userModel.delete(req.user.id);

            res.json({
                success: true,
                message: 'Account deleted successfully',
            });
        } catch (error) {
            logger.error('Delete account error:', error);
            next(error);
        }
    }
}

module.exports = new UserController();
