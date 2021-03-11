import * as firebase from 'firebase';
import 'firebase/firestore';
import { LogBox } from 'react-native';
import { decode, encode } from 'base-64';

/**
 * Due to a bug in the firebase library, a global import for 'base-64' is required.
 * I put the global import here so we know it's related to firestore and can be
 * removed later when the bug in the library is resolved and it can be removed.
 */
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreLogs(['Setting a timer']);

const firebaseConfig = {
  apiKey: 'AIzaSyCj7pKykN3ot7fqp0lf7Wi6JfNtdVFf9PE',
  authDomain: 'ambulancezorg-app.firebaseapp.com',
  databaseURL: 'https://ambulancezorg-app.europe-west1.firebaseio.com',
  projectId: 'ambulancezorg-app',
  storageBucket: 'ambulancezorg-app.appspot.com',
  messagingSenderId: '824736346090',
  appId: '1:824736346090:web:57b383dd2f5ee3d3654c93',
  measurementId: 'G-F5H77QVVV3',
};

const database = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.firestore();
};

export default database;
