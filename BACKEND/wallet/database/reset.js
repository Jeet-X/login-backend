
// ==========================================
// database/reset.js - Reset Database Script
// ==========================================
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'auth_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

async function resetDatabase() {
    const client = await pool.connect();

    try {
        console.log('🔄 Resetting database...\n');

        // Drop all tables
        console.log('🗑️  Dropping existing tables...');
        await client.query('DROP TABLE IF EXISTS user_devices CASCADE');
        await client.query('DROP TABLE IF EXISTS users CASCADE');
        console.log('✓ Tables dropped\n');

        // Run migrations
        console.log('📝 Running migrations...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await client.query(schema);
        console.log('✓ Schema created\n');

        console.log('✅ Database reset complete!\n');
        console.log('Next step: Run seed to add test data');
        console.log('  npm run seed\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Reset failed:', error.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

resetDatabase();
