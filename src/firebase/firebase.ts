import firebase from 'firebase/compat/app';
import 'firebase/compat/functions';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.FIREBASE_APP_ID ?? '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? '',
};

const Firebase =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

// Below works, but due to a bug it could break by a future update of firebase. In that case read: https://github.com/firebase/firebase-tools/issues/3519#issuecomment-865173539
if (
  process.env.NODE_ENV === 'development' &&
  process.env.DEVELOPMENT_USE_LOCAL_FUNCTIONS === 'true'
) {
  firebase
    .app()
    .functions(process.env.FIREBASE_REGION)
    .useEmulator('10.0.2.2', 5001);
}

export const functions = firebase.app().functions(process.env.FIREBASE_REGION);
export const auth = firebase.auth();

export default Firebase;
