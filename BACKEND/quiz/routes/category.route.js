const express = require('express');
const { query, param } = require('express-validator');
const categoryController = require('@/controllers/quiz/category.controller');
const { authenticateToken } = require('@/middleware/auth.middleware');
const { validate } = require('@/utils/validators');
const router = express.Router();



/**
 * @route   GET /api/v1/categories/test
 * @desc    Test endpoint
 * @access  Protected
 */
// router.get('/test', (req, res) => {
//     res.json({
//         success: true,
//         message: 'Quiz category routes are working',
//         timestamp: new Date().toISOString(),
//         available_endpoints: {
//             GET: [
//                 {
//                     all_categories: '/api/v1/categories',
//                     description: 'Get all categories with sub-categories and availability info',
//                     token: 'required',
//                     response_example: {
//                         categories: [
//                             {
//                                 id: 'uuid',
//                                 name: 'General Knowledge',
//                                 description: 'Test your general knowledge',
//                                 icon_url: 'https://...',
//                                 display_order: 1,
//                                 total_sub_categories: 3,
//                                 sub_categories: [
//                                     {
//                                         id: 'uuid',
//                                         name: 'World Geography',
//                                         description: 'Questions about world geography',
//                                         icon_url: 'https://...',
//                                         practice_available: true,
//                                         tournament_available: true,
//                                         active_tournaments: 2
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 },
//                 {
//                     category_detail: '/api/v1/categories/:id',
//                     description: 'Get single category with sub-categories',
//                     token: 'required',
//                     params: { id: 'UUID, required' }
//                 },
//                 {
//                     sub_category_detail: '/api/v1/categories/sub/:id',
//                     description: 'Get sub-category details with practice/tournament info',
//                     token: 'required',
//                     params: { id: 'UUID, required' }
//                 },
//                 {
//                     search: '/api/v1/categories/search',
//                     description: 'Search categories and sub-categories',
//                     token: 'required',
//                     query: { q: 'string, required, min 2 characters' }
//                 }
//             ]
//         },
//         usage_flow: {
//             step_1: 'Call GET /api/v1/categories to get all categories',
//             step_2: 'Display categories in UI',
//             step_3: 'User selects a sub-category',
//             step_4: 'Call GET /api/v1/quiz/:sub_category_id/entry to get entry options',
//             step_5: 'User chooses Practice or Tournament mode'
//         }
//     });
// });


// All routes require authentication
// router.use(authenticateToken);

/**
 * @route   GET /api/v1/categories/test
 * @desc    Test endpoint
 * @access  Public
 */
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Quiz category routes are working',
        timestamp: new Date().toISOString(),
        available_endpoints: {
            GET: [
                {
                    all_categories: '/api/v1/categories',
                    description: 'Get all quiz categories with availability info',
                    token: 'optional',
                    response_example: {
                        categories: [
                            {
                                id: 'uuid',
                                name: 'General Knowledge',
                                description: 'Test your general knowledge',
                                icon_url: 'https://...',
                                display_order: 1,
                                total_questions: 150,
                                practice_available: true,
                                tournament_available: true,
                                active_tournaments: 2
                            }
                        ]
                    }
                },
                {
                    category_detail: '/api/v1/categories/:id',
                    description: 'Get single category with detailed info',
                    token: 'optional',
                    params: { id: 'UUID, required' }
                },
                {
                    search: '/api/v1/categories/search',
                    description: 'Search categories',
                    token: 'optional',
                    query: { q: 'string, required, min 2 characters' }
                }
            ]
        },
        usage_flow: {
            step_1: 'Call GET /api/v1/categories to get all categories',
            step_2: 'Display categories in UI',
            step_3: 'User selects a category',
            step_4: 'Call GET /api/v1/quiz/:category_id/entry to get entry options',
            step_5: 'User chooses Practice or Tournament mode'
        }
    });
});

/**
 * @route   GET /api/v1/quiz/categories
 * @desc    Get all categories with sub-categories
 * @access  Protected
 */
router.get('/', categoryController.getAllCategories);

/**
 * @route   GET /api/v1/quiz/categories/search
 * @desc    Search categories and sub-categories
 * @access  Protected
 */
router.get(
    '/search',
    [
        query('q').notEmpty().trim().isLength({ min: 2 }),
    ],
    validate,
    categoryController.searchCategories
);

/**
 * @route   GET /api/v1/quiz/categories/:id
 * @desc    Get category by ID with sub-categories
 * @access  Protected
 */
router.get(
    '/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    categoryController.getCategory
);

/**
 * @route   GET /api/v1/quiz/categories/sub/:id
 * @desc    Get sub-category details
 * @access  Protected
 */
router.get(
    '/sub/:id',
    [
        param('id').isUUID(),
    ],
    validate,
    categoryController.getSubCategory
);

module.exports = router;