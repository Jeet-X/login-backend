const db = require('@/config/database');

class WalletModel {
    async create(userId) {
        const query = `
      INSERT INTO wallets (user_id, coin_balance)
      VALUES ($1, 0)
      ON CONFLICT (user_id) DO NOTHING
      RETURNING *
    `;
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }

    async findByUserId(userId) {
        const query = 'SELECT * FROM wallets WHERE user_id = $1';
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }

    async getOrCreate(userId) {
        let wallet = await this.findByUserId(userId);
        if (!wallet) {
            wallet = await this.create(userId);
        }
        return wallet;
    }

    async getBalance(userId) {
        const wallet = await this.findByUserId(userId);
        return wallet ? wallet.coin_balance : 0;
    }

    async addCoins(userId, coins, source, referenceId, description) {
        const client = await db.getClient();

        try {
            await client.query('BEGIN');

            // Get or create wallet
            let wallet = await this.findByUserId(userId);
            if (!wallet) {
                wallet = await this.create(userId);
            }

            const balanceBefore = wallet.coin_balance;
            const balanceAfter = balanceBefore + coins;

            // Update wallet balance
            const updateQuery = `
        UPDATE wallets
        SET coin_balance = coin_balance + $1
        WHERE user_id = $2
        RETURNING *
      `;
            const updateResult = await client.query(updateQuery, [coins, userId]);

            // Create transaction record
            const txQuery = `
        INSERT INTO wallet_transactions (
          user_id, wallet_id, coins, transaction_type,
          source, reference_id, description,
          balance_before, balance_after
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;

            await client.query(txQuery, [
                userId,
                wallet.id,
                coins,
                'CREDIT',
                source,
                referenceId,
                description,
                balanceBefore,
                balanceAfter,
            ]);

            await client.query('COMMIT');
            return updateResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getTransactions(userId, limit = 50) {
        const query = `
      SELECT * FROM wallet_transactions
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;
        const result = await db.query(query, [userId, limit]);
        return result.rows;
    }
}

module.exports = new WalletModel();
