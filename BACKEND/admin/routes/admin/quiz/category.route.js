const express = require('express');
const { body, query, param } = require('express-validator');
const adminCategoryController = require('@/controllers/quiz/adminCategory.controller');
const { authenticateToken, isAdmin } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');
const router = express.Router();



/**
 * @route   GET /admin/api/v1/quiz/categories/test
 * @desc    Test endpoint
 * @access  Admin
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Admin category routes are working',
        timestamp: new Date().toISOString(),
        available_endpoints: {
            POST: [
                {
                    create: '/admin/api/v1/quiz/categories',
                    description: 'Create new category',
                    body: {
                        name: 'string, required',
                        description: 'string, optional',
                        icon_url: 'string, optional',
                        display_order: 'integer, optional'
                    }
                },
                {
                    bulk_import: '/admin/api/v1/quiz/categories/bulk',
                    description: 'Bulk import categories',
                    body: {
                        categories: 'array of category objects, required'
                    }
                },
                {
                    reorder: '/admin/api/v1/quiz/categories/reorder',
                    description: 'Reorder categories',
                    body: {
                        category_orders: 'array of {id, display_order}, required'
                    }
                }
            ],
            GET: [
                {
                    list: '/admin/api/v1/quiz/categories',
                    description: 'Get all categories with stats',
                    query: {
                        status: 'enum: ACTIVE|INACTIVE, optional',
                        limit: 'integer, optional, default 50',
                        offset: 'integer, optional, default 0'
                    }
                },
                {
                    detail: '/admin/api/v1/quiz/categories/:id',
                    description: 'Get category by ID',
                    params: { id: 'UUID, required' }
                },
                {
                    statistics: '/admin/api/v1/quiz/categories/stats',
                    description: 'Get category statistics'
                }
            ],
            PUT: [
                {
                    update: '/admin/api/v1/quiz/categories/:id',
                    description: 'Update category',
                    params: { id: 'UUID, required' },
                    body: {
                        name: 'string, required',
                        description: 'string, optional',
                        icon_url: 'string, optional',
                        display_order: 'integer, optional'
                    }
                },
                {
                    toggle_status: '/admin/api/v1/quiz/categories/:id/status',
                    description: 'Activate/Deactivate category',
                    params: { id: 'UUID, required' },
                    body: { status: 'enum: ACTIVE|INACTIVE, required' }
                }
            ],
            DELETE: [
                {
                    delete: '/admin/api/v1/quiz/categories/:id',
                    description: 'Delete category (only if no questions exist)',
                    params: { id: 'UUID, required' }
                }
            ]
        }
    });
});


// All routes require admin authentication
router.use(authenticateToken);
router.use(isAdmin);
/**
 * @route   POST /admin/api/v1/quiz/categories
 * @desc    Create new category
 * @access  Admin
 */
router.post(
    '/',
    [
        body('name').notEmpty().trim().withMessage('Name is required'),
        body('description').optional().trim(),
        body('icon_url').optional().isURL().withMessage('Invalid icon URL'),
        body('display_order').optional().isInt({ min: 0 }).withMessage('Display order must be a positive integer'),
    ],
    validate,
    adminCategoryController.createCategory
);

/**
 * @route   GET /admin/api/v1/quiz/categories
 * @desc    Get all categories
 * @access  Admin
 */
router.get(
    '/',
    [
        query('status').optional().isIn(['ACTIVE', 'INACTIVE']),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('offset').optional().isInt({ min: 0 }),
    ],
    validate,
    adminCategoryController.getSubCategories
);

/**
 * @route   GET /admin/api/v1/quiz/categories/stats
 * @desc    Get category statistics
 * @access  Admin
 */
router.get('/stats', adminCategoryController.getStatistics);

/**
 * @route   GET /admin/api/v1/quiz/categories/:id
 * @desc    Get category by ID
 * @access  Admin
 */
router.get(
    '/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    adminCategoryController.getCategory
);

/**
 * @route   PUT /admin/api/v1/quiz/categories/:id
 * @desc    Update category
 * @access  Admin
 */
router.put(
    '/:id',
    [
        param('id').isUUID(),
        body('name').notEmpty().trim(),
        body('description').optional().trim(),
        body('icon_url').optional().isURL(),
        body('display_order').optional().isInt({ min: 0 }),
    ],
    validate,
    adminCategoryController.updateCategory
);

/**
 * @route   PUT /admin/api/v1/quiz/categories/:id/status
 * @desc    Toggle category status
 * @access  Admin
 */
router.put(
    '/:id/status',
    [
        param('id').isUUID(),
        body('status').isIn(['ACTIVE', 'INACTIVE']),
    ],
    validate,
    adminCategoryController.toggleStatus
);

/**
 * @route   DELETE /admin/api/v1/quiz/categories/:id
 * @desc    Delete category
 * @access  Admin
 */
router.delete(
    '/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    adminCategoryController.deleteCategory
);

/**
 * @route   POST /admin/api/v1/quiz/categories/bulk
 * @desc    Bulk import categories
 * @access  Admin
 */
router.post(
    '/bulk',
    [
        body('categories').isArray({ min: 1 }).withMessage('Categories must be a non-empty array'),
        body('categories.*.name').notEmpty().trim().withMessage('Each category must have a name'),
    ],
    validate,
    adminCategoryController.bulkImport
);

/**
 * @route   POST /admin/api/v1/quiz/categories/reorder
 * @desc    Reorder categories
 * @access  Admin
 */
router.post(
    '/reorder',
    [
        body('category_orders').isArray({ min: 1 }),
        body('category_orders.*.id').isUUID(),
        body('category_orders.*.display_order').isInt({ min: 0 }),
    ],
    validate,
    adminCategoryController.reorderCategories
);

module.exports = router;