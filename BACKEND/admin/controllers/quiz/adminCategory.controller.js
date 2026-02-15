const categoryModel = require('@/models/quiz/category.model');
const logger = require('@/utils/logger');
const db = require('@/config/database');

class AdminCategoryController {
    /**
     * Create new category
     */
    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            const category = await categoryModel.create(categoryData);

            res.status(201).json({
                success: true,
                message: 'Category created successfully',
                data: category
            });
        } catch (error) {
            logger.error('Create category error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get all categories (Admin view with stats)
     */
    async getSubCategories(req, res) {
        try {
            const { status, limit = 50, offset = 0 } = req.query;

            let query = `
                SELECT 
                    c.*,
                    COUNT(DISTINCT q.id) as total_questions,
                    COUNT(DISTINCT CASE WHEN q.difficulty = 'EASY' THEN q.id END) as easy_questions,
                    COUNT(DISTINCT CASE WHEN q.difficulty = 'MEDIUM' THEN q.id END) as medium_questions,
                    COUNT(DISTINCT CASE WHEN q.difficulty = 'HARD' THEN q.id END) as hard_questions,
                    COUNT(DISTINCT qs.id) as question_sets,
                    COUNT(DISTINCT ts.id) as total_tournaments,
                    COUNT(DISTINCT CASE WHEN pc.id IS NOT NULL THEN 1 END) > 0 as practice_configured
                FROM quiz_sub_categories c
                LEFT JOIN quiz_questions q ON c.id = q.sub_category_id AND q.status = 'ACTIVE'
                LEFT JOIN question_sets qs ON c.id = qs.sub_category_id
                LEFT JOIN tournament_slots ts ON c.id = ts.sub_category_id
                LEFT JOIN practice_mode_config pc ON c.id = pc.sub_category_id AND pc.status = 'ACTIVE'
                WHERE 1=1
            `;

            const params = [];
            let paramCount = 1;

            if (status) {
                query += ` AND c.status = $${paramCount}`;
                params.push(status);
                paramCount++;
            }

            query += ` GROUP BY c.id ORDER BY c.display_order ASC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
            params.push(limit, offset);

            const result = await db.query(query, params);

            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM quiz_sub_categories WHERE 1=1';
            const countParams = [];

            if (status) {
                countQuery += ' AND status = $1';
                countParams.push(status);
            }

            const countResult = await db.query(countQuery, countParams);

            res.json({
                success: true,
                data: result.rows,
                pagination: {
                    total: parseInt(countResult.rows[0].count),
                    limit: parseInt(limit),
                    offset: parseInt(offset)
                }
            });
        } catch (error) {
            logger.error('Get categories error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get category by ID
     */
    async getCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await categoryModel.getCategoryWithStats(id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            logger.error('Get category error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Update category
     */
    async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const categoryData = req.body;

            const category = await categoryModel.update(id, categoryData);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                message: 'Category updated successfully',
                data: category
            });
        } catch (error) {
            logger.error('Update category error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Toggle category status
     */
    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const category = await categoryModel.toggleStatus(id, status);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                message: `Category ${status.toLowerCase()} successfully`,
                data: category
            });
        } catch (error) {
            logger.error('Toggle category status error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Delete category
     */
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;

            const category = await categoryModel.delete(id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                message: 'Category deleted successfully'
            });
        } catch (error) {
            logger.error('Delete category error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Bulk import categories
     */
    async bulkImport(req, res) {
        try {
            const { categories } = req.body;
            const results = {
                total: categories.length,
                success: 0,
                failed: 0,
                errors: []
            };

            for (const categoryData of categories) {
                try {
                    await categoryModel.create(categoryData);
                    results.success++;
                } catch (error) {
                    results.failed++;
                    results.errors.push({
                        category: categoryData.name,
                        error: error.message
                    });
                }
            }

            res.json({
                success: true,
                message: 'Bulk import completed',
                data: results
            });
        } catch (error) {
            logger.error('Bulk import error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Reorder categories
     */
    async reorderCategories(req, res) {
        try {
            const { category_orders } = req.body;
            // category_orders should be array like: [{id: 'uuid', display_order: 1}, ...]

            const client = await db.getClient();
            await client.query('BEGIN');

            try {
                for (const item of category_orders) {
                    await client.query(
                        'UPDATE quiz_categories SET display_order = $1, updated_at = NOW() WHERE id = $2',
                        [item.display_order, item.id]
                    );
                }

                await client.query('COMMIT');

                res.json({
                    success: true,
                    message: 'Categories reordered successfully'
                });
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } catch (error) {
            logger.error('Reorder categories error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get category statistics
     */
    async getStatistics(req, res) {
        try {
            const query = `
                SELECT 
                    COUNT(*) as total_categories,
                    COUNT(*) FILTER (WHERE status = 'ACTIVE') as active_categories,
                    COUNT(*) FILTER (WHERE status = 'INACTIVE') as inactive_categories,
                    (SELECT COUNT(*) FROM quiz_questions WHERE status = 'ACTIVE') as total_questions,
                    (SELECT COUNT(*) FROM question_sets WHERE status = 'ACTIVE') as total_question_sets,
                    (SELECT COUNT(*) FROM tournament_slots WHERE status = 'SCHEDULED') as scheduled_tournaments,
                    (SELECT COUNT(*) FROM practice_mode_config WHERE status = 'ACTIVE') as practice_configs
                FROM quiz_sub_categories
            `;

            const result = await db.query(query);

            res.json({
                success: true,
                data: result.rows[0]
            });
        } catch (error) {
            logger.error('Get statistics error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new AdminCategoryController();