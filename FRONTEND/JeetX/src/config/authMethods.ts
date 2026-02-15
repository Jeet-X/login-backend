// src/utils/authMethods.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Configure Google Signin
GoogleSignin.configure({
    webClientId: '131612278242-q6rlcncp4af0t7abq9bmdg81f7ld9ahl.apps.googleusercontent.com', // Correct Web Client ID from google-services.json (client_type: 3)
    offlineAccess: true,
});

export const googleLogin = async () => {
    console.log('[googleLogin] Starting Google Login flow...');
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('[googleLogin] Play Services checked.');

        const signInResult = await GoogleSignin.signIn();
        console.log('[googleLogin] GoogleSignin.signIn() result:', JSON.stringify(signInResult, null, 2));

        const { data } = signInResult;
        const idToken = data?.idToken;

        if (!idToken) {
            console.error('[googleLogin] No ID token found in signIn result.');
            throw new Error('No ID token found');
        }
        console.log('[googleLogin] ID Token retrieved successfully.');

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log('[googleLogin] Firebase Credential created.');

        const userCredential = await auth().signInWithCredential(googleCredential);
        console.log('[googleLogin] Firebase signInWithCredential success. User:', userCredential.user.uid);

        return userCredential.user;
    } catch (err: any) {
        console.error('[googleLogin] Google login error:', err);
        if (err.code) console.error('[googleLogin] Error Code:', err.code);
        if (err.message) console.error('[googleLogin] Error Message:', err.message);
        throw err;
    }
};

import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

export const facebookLogin = async () => {
    console.log('[facebookLogin] Starting Facebook Login flow...');
    try {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            console.log('[facebookLogin] User cancelled the login process');
            throw new Error('User cancelled the login process');
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            console.error('[facebookLogin] Something went wrong obtaining access token');
            throw new Error('Something went wrong obtaining access token');
        }
        console.log('[facebookLogin] Access Token retrieved successfully.');

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log('[facebookLogin] Firebase Credential created.');

        // Sign-in the user with the credential
        const userCredential = await auth().signInWithCredential(facebookCredential);
        console.log('[facebookLogin] Firebase signInWithCredential success. User:', userCredential.user.uid);

        return userCredential.user;
    } catch (error) {
        console.error('[facebookLogin] Facebook login error:', error);
        throw error;
    }
};
