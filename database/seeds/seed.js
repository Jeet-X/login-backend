require('dotenv').config();
require("module-alias/register");

const { Pool } = require('pg');
const firebaseService = require('@/services/firebase.service');
const adminAuthController = require('@/controllers/admin/auth.controller');

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
                full_name: 'Aritra Naharay',
                email: 'aritranaharay@gmail.com',
                mobile: '+919599904224',
                country_code: '+91',
                is_email_verified: true,
                is_mobile_verified: true,
                status: 'ACTIVE',
                role: 'SUPER_ADMIN'
            },
            {
                full_name: 'Himanshi P',
                email: 'ph093279@gmail.com',
                mobile: '+919499172303',
                country_code: '+91',
                is_email_verified: true,
                is_mobile_verified: true,
                status: 'ACTIVE',
                role: 'USER'
            },

            {
                full_name: 'Aritra N',
                email: 'aritrasings@gmail.com',
                mobile: '+919958050224',
                country_code: '+91',
                is_email_verified: true,
                is_mobile_verified: true,
                status: 'ACTIVE',
                role: 'ADMIN'
            }
        ];

        for (const user of testUsers) {
            let admin_permissions = null
            if (user.role !== 'USER') {
                admin_permissions = adminAuthController.getDefaultPermissions()
            }



            const firebaseUser = await firebaseService.createUserWithEmailPassword(
                user.email,
                user.password,
                user.mobile
            );
            const query = `
        INSERT INTO users (
          firebase_uid, full_name, email, mobile,
          is_email_verified, is_mobile_verified, status,role,admin_permissions
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)
        RETURNING id, email
      `;

            const result = await client.query(query, [
                firebaseUser.uid,
                user.full_name,
                user.email,
                user.mobile,
                user.is_email_verified,
                user.is_mobile_verified,
                user.status,
                user.role,
                admin_permissions
            ]);
            if (user.role === 'USER') {
                const userId = result.rows[0].id
                const referralService = require('@/services/referral.service');
                await referralService.createReferralCodeForUser(userId);

                // CREATE WALLET FOR NEW USER
                const walletModel = require('@/models/wallet/wallet.model');
                await walletModel.create(userId);
            }

            console.log(`  ✓ Created user: ${result.rows[0].email}`);
        }

        console.log('\n✅ Database seeded successfully!\n');
        console.log('Test users created:');
        console.log('  Email: aritranaharay@gmail.com-SUPER_ADMIN');
        console.log('  Email: ph093279@gmail.com-USER');
        console.log('  Email: aritrasings@gmail.com-ADMIN');
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
