import { initializeApp } from 'firebase/app';
import { LogBox } from 'react-native';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth } from 'firebase/auth';

/**
 * Firebase documentation: https://docs.expo.dev/guides/using-firebase/
 */

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

const Firebase = initializeApp(firebaseConfig);

export const functions = getFunctions(Firebase, process.env.FIREBASE_REGION);
if (
  process.env.NODE_ENV === 'development' &&
  process.env.DEVELOPMENT_USE_LOCAL_FUNCTIONS === 'true'
) {
  connectFunctionsEmulator(functions, '10.0.2.2', 5001);
}

export const auth = getAuth();

export default Firebase;
