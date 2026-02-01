const practiceConfigModel = require('@/models/quiz/practiceConfig.model');
const logger = require('@/utils/logger');
const db = require("@/config/database")

class AdminPracticeConfigController {
    /**
     * Create practice mode configuration
     */
    async createConfig(req, res) {
        try {
            const configData = req.body;

            // Validate refund rules
            const refundRules = configData.refund_rules;
            if (!refundRules['80'] || !refundRules['60'] || !refundRules['0']) {
                return res.status(400).json({
                    success: false,
                    message: 'Refund rules must include thresholds for 80%, 60%, and 0%'
                });
            }

            const config = await practiceConfigModel.create(configData);

            res.status(201).json({
                success: true,
                message: 'Practice mode configuration created successfully',
                data: config
            });
        } catch (error) {
            logger.error('Create practice config error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get practice configurations
     */
    async getConfigs(req, res) {
        try {
            const { sub_category_id } = req.query;

            let query = `
                SELECT pc.*, qsc.name as sub_category_name
                FROM practice_mode_config pc
                JOIN quiz_sub_categories qsc ON pc.sub_category_id = qsc.id
            `;
            const params = [];

            if (sub_category_id) {
                query += ' WHERE pc.sub_category_id = $1';
                params.push(sub_category_id);
            }

            query += ' ORDER BY pc.created_at DESC';

            const result = await db.query(query, params);

            res.json({
                success: true,
                data: result.rows
            });
        } catch (error) {
            logger.error('Get practice configs error:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Update practice configuration
     */
    async updateConfig(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const query = `
                UPDATE practice_mode_config
                SET entry_coins = $1, timer_enabled = $2, timer_duration = $3,
                    timer_type = $4, refund_rules = $5, terms_content = $6,
                    terms_version = $7, updated_at = NOW()
                WHERE id = $8
                RETURNING *
            `;

            const values = [
                updateData.entry_coins,
                updateData.timer_enabled,
                updateData.timer_duration,
                updateData.timer_type,
                JSON.stringify(updateData.refund_rules),
                updateData.terms_content,
                updateData.terms_version,
                id
            ];

            const result = await db.query(query, values);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Configuration not found'
                });
            }

            res.json({
                success: true,
                message: 'Practice configuration updated successfully',
                data: result.rows[0]
            });
        } catch (error) {
            logger.error('Update practice config error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Toggle configuration status
     */
    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const query = `
                UPDATE practice_mode_config
                SET status = $1, updated_at = NOW()
                WHERE id = $2
                RETURNING *
            `;

            const result = await db.query(query, [status, id]);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Configuration not found'
                });
            }

            res.json({
                success: true,
                message: `Configuration ${status.toLowerCase()} successfully`,
                data: result.rows[0]
            });
        } catch (error) {
            logger.error('Toggle config status error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new AdminPracticeConfigController();