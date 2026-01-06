require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool specifically for seeding
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'auth_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

async function seedDatabase() {
    const client = await pool.connect();

    try {
        console.log('🌱 Starting database seeding...\n');

        // Check if tables exist
        const tablesExist = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'user_devices')
    `);

        if (tablesExist.rows.length < 2) {
            console.error('❌ Required tables do not exist!');
            console.log('\nPlease run migrations first:');
            console.log('  npm run migrate\n');
            process.exit(1);
        }

        console.log('✓ Tables verified\n');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await client.query('TRUNCATE users, user_devices CASCADE');
        console.log('✓ Data cleared\n');

        // Seed test users
        console.log('👤 Seeding test users...');

        const testUsers = [
            {
                firebase_uid: 'test_firebase_uid_001',
                full_name: 'John Doe',
                email: 'john.doe@example.com',
                mobile: '+911234567890',
                is_email_verified: true,
                is_mobile_verified: true,
                status: 'ACTIVE',
            },
            {
                firebase_uid: 'test_firebase_uid_002',
                full_name: 'Jane Smith',
                email: 'jane.smith@example.com',
                mobile: '+919876543210',
                is_email_verified: true,
                is_mobile_verified: true,
                status: 'ACTIVE',
            },
            {
                firebase_uid: 'test_firebase_uid_003',
                full_name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                mobile: '+915555555555',
                is_email_verified: false,
                is_mobile_verified: true,
                status: 'ACTIVE',
            },
        ];

        for (const user of testUsers) {
            const query = `
        INSERT INTO users (
          firebase_uid, full_name, email, mobile,
          is_email_verified, is_mobile_verified, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, email
      `;

            const result = await client.query(query, [
                user.firebase_uid,
                user.full_name,
                user.email,
                user.mobile,
                user.is_email_verified,
                user.is_mobile_verified,
                user.status,
            ]);

            console.log(`  ✓ Created user: ${result.rows[0].email}`);
        }

        console.log('\n✅ Database seeded successfully!\n');
        console.log('Test users created:');
        console.log('  Email: john.doe@example.com');
        console.log('  Email: jane.smith@example.com');
        console.log('  Email: bob.johnson@example.com');
        console.log('\nYou can use these emails for testing with any password\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

seedDatabase();
