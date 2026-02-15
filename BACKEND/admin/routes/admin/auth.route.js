const express = require('express');
const { body, param } = require('express-validator');
const adminAuthController = require('@/controllers/admin/auth.controller');
const { authenticateToken, isSuperAdmin } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');

const router = express.Router();

/**
 * @route   POST /admin/api/v1/auth/register
 * @desc    Register new admin (Super Admin only or initial setup)
 * @access  Super Admin / Public (if no admins exist)
 */
router.post(
    '/register',
    [
        body('full_name').notEmpty().trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }),
        body('mobile').optional(),
        body('country_code').optional(),
        body('role').optional().isIn(['ADMIN', 'SUPER_ADMIN']),
        body('permissions').optional().isObject(),
    ],
    validate,
    authenticateToken,
    adminAuthController.registerAdmin
);

/**
 * @route   POST /admin/api/v1/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post(
    '/login',
    [
        body('email').isEmail().normalizeEmail(),
        body('password').notEmpty(),
    ],
    validate,
    adminAuthController.loginAdmin
);

/**
 * @route   GET /admin/api/v1/auth/admins
 * @desc    Get all admins
 * @access  Super Admin
 */
router.get(
    '/admins',
    authenticateToken,
    isSuperAdmin,
    adminAuthController.getAdmins
);

/**
 * @route   PUT /admin/api/v1/auth/admins/:id/permissions
 * @desc    Update admin permissions
 * @access  Super Admin
 */
router.put(
    '/admins/:id/permissions',
    authenticateToken,
    isSuperAdmin,
    [
        param('id').isUUID(),
        body('permissions').isObject(),
    ],
    validate,
    adminAuthController.updatePermissions
);

/**
 * @route   DELETE /admin/api/v1/auth/admins/:id
 * @desc    Deactivate admin
 * @access  Super Admin
 */
router.delete(
    '/admins/:id',
    authenticateToken,
    isSuperAdmin,
    [
        param('id').isUUID(),
    ],
    validate,
    adminAuthController.deactivateAdmin
);


/**
 * @route   GET /admin/api/v1/auth/test
 * @desc    Test endpoint - shows available admin auth endpoints
 * @access  Public
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Admin auth routes are working',
        timestamp: new Date().toISOString(),
        available_endpoints: {
            POST: [
                {
                    register: '/admin/api/v1/auth/register',
                    description: 'Register new admin (Super Admin only or initial setup)',
                    access: 'Super Admin / Public (if no admins exist)',
                    body: {
                        full_name: 'string, required',
                        email: 'email, required',
                        password: 'string, required, min 8 characters',
                        mobile: 'string, optional',
                        role: 'enum: ADMIN|SUPER_ADMIN, optional',
                        permissions: 'object, optional'
                    }
                },
                {
                    login: '/admin/api/v1/auth/login',
                    description: 'Admin login',
                    access: 'Public',
                    body: {
                        email: 'email, required',
                        password: 'string, required'
                    }
                }
            ],
            GET: [
                {
                    admins: '/admin/api/v1/auth/admins',
                    description: 'Get all admins',
                    access: 'Super Admin',
                    token: 'required in Authorization header as Bearer token'
                }
            ],
            PUT: [
                {
                    update_permissions: '/admin/api/v1/auth/admins/:id/permissions',
                    description: 'Update admin permissions',
                    access: 'Super Admin',
                    token: 'required in Authorization header as Bearer token',
                    params: {
                        id: 'UUID, required'
                    },
                    body: {
                        permissions: 'object, required'
                    }
                }
            ],
            DELETE: [
                {
                    deactivate_admin: '/admin/api/v1/auth/admins/:id',
                    description: 'Deactivate admin',
                    access: 'Super Admin',
                    token: 'required in Authorization header as Bearer token',
                    params: {
                        id: 'UUID, required'
                    }
                }
            ]
        }
    });
});

module.exports = router;