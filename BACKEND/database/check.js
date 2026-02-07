

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'auth_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

async function checkDatabase() {
    const client = await pool.connect();

    try {
        console.log('🔍 Checking database status...\n');

        // Check connection
        const result = await client.query('SELECT NOW()');
        console.log('✓ Database connection: OK');
        console.log(`  Server time: ${result.rows[0].now}\n`);

        // Check tables
        console.log('📊 Tables:');
        const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

        if (tables.rows.length === 0) {
            console.log('  ❌ No tables found');
            console.log('\n  Run migrations first: npm run migrate\n');
        } else {
            for (const row of tables.rows) {
                const count = await client.query(`SELECT COUNT(*) FROM ${row.table_name}`);
                console.log(`  ✓ ${row.table_name} (${count.rows[0].count} rows)`);
            }
        }

        // Check indexes
        console.log('\n📇 Indexes:');
        const indexes = await client.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public'
      ORDER BY indexname
    `);

        if (indexes.rows.length === 0) {
            console.log('  ❌ No indexes found');
        } else {
            indexes.rows.forEach(row => {
                console.log(`  ✓ ${row.indexname}`);
            });
        }

        console.log('\n✅ Database check complete!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Check failed:', error.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

checkDatabase();