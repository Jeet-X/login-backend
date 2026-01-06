
// ==========================================
// src/middleware/auth.middleware.js
// ==========================================
const jwtService = require('../services/jwt.service');
const db = require('../config/database');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'ACCESS_TOKEN_REQUIRED',
            });
        }

        const decoded = jwtService.verifyAccessToken(token);

        // Verify user exists and is active
        const query = 'SELECT id, email, status FROM users WHERE id = $1';
        const result = await db.query(query, [decoded.userId]);

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'USER_NOT_FOUND',
            });
        }

        const user = result.rows[0];

        if (user.status === 'BLOCKED') {
            return res.status(403).json({
                success: false,
                error: 'USER_BLOCKED',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            error: 'INVALID_TOKEN',
        });
    }
};

module.exports = { authenticateToken };
