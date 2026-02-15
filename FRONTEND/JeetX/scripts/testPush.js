const admin = require('firebase-admin');

/**
 * To run this script:
 * 1. Download your serviceAccountKey.json from Firebase Console -> Project Settings -> Service Accounts.
 * 2. Place it in the same directory as this script.
 * 3. Run: node testPush.js <FCM_TOKEN>
 */

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const token = process.argv[2];

if (!token) {
    console.log('Error: Please provide an FCM token as an argument.');
    console.log('Example: node testPush.js YOUR_DEVICE_TOKEN');
    process.exit(1);
}

const message = {
    notification: {
        title: 'Jeet-X Test Notification',
        body: 'This is a test notification sent from the admin script! 🚀'
    },
    data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
        category: 'SYSTEM'
    },
    token: token
};

admin.messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
