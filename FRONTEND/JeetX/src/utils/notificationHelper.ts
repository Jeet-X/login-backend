import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

/**
 * Requests permission for push notifications on both Android and iOS
 */
export async function requestUserPermission() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        const enabled = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        return enabled === PermissionsAndroid.RESULTS.GRANTED;
    } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        return enabled;
    }
}

/**
 * Fetches the FCM token and logs it.
 * In a real app, you should send this token to your backend API.
 */
export const getFCMToken = async () => {
    try {
        const token = await messaging().getToken();
        if (token) {
            console.log('🚀 FCM Device Token:', token);
            // TODO: Call your backend API to save this token for the current user
            // e.g., await api.updateUserToken(token);
            return token;
        }
    } catch (error) {
        console.error('❌ Error getting FCM token:', error);
    }
};

/**
 * Sets up listeners for foreground, background, and initial notification events
 */
export const notificationListener = () => {
    // 1. Listen for background messages (Minimal logic here, mostly for logging/sync)
    messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('🌙 Message handled in the background!', remoteMessage.data);
    });

    // 2. Listen for foreground messages (App is open)
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('☀️ Foreground Notification received:', remoteMessage.notification?.title);

        Alert.alert(
            remoteMessage.notification?.title || 'Jeet-X Update',
            remoteMessage.notification?.body || 'Check the app for new updates!',
            [
                { text: 'View', onPress: () => handleNotificationAction(remoteMessage) },
                { text: 'Dismiss', style: 'cancel' }
            ]
        );
    });

    // 3. Listen for notification clicks when app is in background
    const unsubscribeOnOpened = messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('🖱️ Notification clicked (from background):', remoteMessage.data);
        handleNotificationAction(remoteMessage);
    });

    // 4. Check if the app was opened from a "Quit" state via notification
    messaging()
        .getInitialNotification()
        .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
            if (remoteMessage) {
                console.log('🔌 Notification clicked (from quit state):', remoteMessage.data);
                handleNotificationAction(remoteMessage);
            }
        });

    // 5. Token refresh listener
    const unsubscribeOnTokenRefresh = messaging().onTokenRefresh(token => {
        console.log('🔄 FCM Token Refreshed:', token);
        // TODO: Send new token to backend
    });

    return () => {
        unsubscribeOnMessage();
        unsubscribeOnOpened();
        unsubscribeOnTokenRefresh();
    };
};

/**
 * Centralized handler for notification clicks/actions
 */
const handleNotificationAction = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    const { data } = remoteMessage;
    console.log('🛠️ Handling notification data:', data);

    // Example: Navigate to specific screen
    if (data?.screen) {
        // navigation.navigate(data.screen, { id: data.id });
    }
};
