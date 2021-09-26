import Bugsnag from '@bugsnag/expo';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
import configureStore from './src/redux/configureStore';
import AppSplashScreen from './src/screens/splash/AppSplashScreen';

/**
 * Due to a bug in a third party library a global import for 'base-64'
 * is required. I put the global import here so we can remove it
 * later when the bug in the library is resolved and it can be removed.
 */
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

Bugsnag.start();
const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppSplashScreen />
    </Provider>
  );
};

export default App;
