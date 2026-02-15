// React Native Firebase auto-initializes using google-services.json / GoogleService-Info.plist.
// We typically don't need to manually call initializeApp unless connecting to a secondary project.

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Explicitly export these for use in other files
export const app = firebase.app();
export { auth };
