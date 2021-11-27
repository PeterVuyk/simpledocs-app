import firebase from 'firebase';
import 'firebase/functions';
import 'firebase/storage';
import { LogBox } from 'react-native';
import Constants from 'expo-constants';

LogBox.ignoreLogs(['Setting a timer']);

const firebaseConfig = {
  apiKey: Constants.manifest!.extra!.firebaseApiKey,
  authDomain: Constants.manifest!.extra!.firebaseAuthDomain,
  databaseURL: Constants.manifest!.extra!.firebaseDatabaseUrl,
  projectId: Constants.manifest!.extra!.firebaseProjectId,
  storageBucket: Constants.manifest!.extra!.firebaseStorageBucket,
  messagingSenderId: Constants.manifest!.extra!.firebaseMessagingSenderId,
  appId: Constants.manifest!.extra!.firebaseAppId,
  measurementId: Constants.manifest!.extra!.firebaseMeasurementId,
};

const Firebase =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export default Firebase;
