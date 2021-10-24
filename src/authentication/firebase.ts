import firebase from 'firebase';
import 'firebase/functions';
import { LogBox } from 'react-native';
import environment from '../util/environment';

LogBox.ignoreLogs(['Setting a timer']);
const env = environment.getEnvironment();

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: process.env.AUTH_DOMAIN ?? '',
  databaseURL: env.dbUrl,
  projectId: process.env.PROJECT_ID ?? '',
  storageBucket: process.env.STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID ?? '',
  appId: process.env.APP_ID ?? '',
  measurementId: process.env.MEASUREMENT_ID ?? '',
};

const Firebase =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export default Firebase;
