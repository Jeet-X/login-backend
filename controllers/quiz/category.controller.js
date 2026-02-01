// controllers/quiz/category.controller.js
const categoryService = require('@/services/category.services');
const logger = require('@/utils/logger');

class CategoryController {
    /**
     * Get all categories with sub-categories
     */
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategoriesForMobile();

            res.json({
                success: true,
                message: 'Categories retrieved successfully',
                data: categories,
                total: categories.length
            });
        } catch (error) {
            logger.error('Get all categories error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get category by ID with sub-categories
     */
    async getCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryDetails(id);

            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            logger.error('Get category error:', error);
            res.status(error.message === 'Category not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get sub-category details
     */
    async getSubCategory(req, res) {
        try {
            const { id } = req.params;
            const subCategory = await categoryService.getSubCategoryDetails(id);

            res.json({
                success: true,
                data: subCategory
            });
        } catch (error) {
            logger.error('Get sub-category error:', error);
            res.status(error.message === 'Sub-category not found' ? 404 : 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Search categories and sub-categories
     */
    async searchCategories(req, res) {
        try {
            const { q } = req.query;

            if (!q || q.trim().length < 2) {
                return res.status(400).json({
                    success: false,
                    message: 'Search term must be at least 2 characters'
                });
            }

            const results = await categoryService.searchCategories(q.trim());

            res.json({
                success: true,
                data: results,
                total: results.length
            });
        } catch (error) {
            logger.error('Search categories error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new CategoryController();