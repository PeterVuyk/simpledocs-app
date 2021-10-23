import Bugsnag from '@bugsnag/expo';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
import Constants from 'expo-constants';
import { ThemeProvider } from 'react-native-elements';
import configureStore from './src/redux/configureStore';
import AppSplashScreen from './src/screens/splash/AppSplashScreen';
import AuthProvider from './src/authentication/AuthProvider';

const theme = {
  Chip: {
    theme: { colors: { primary: '#154594' } },
  },
};

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

Bugsnag.start({
  appVersion: Constants.manifest?.version ?? 'unknown-version',
  metadata: { company: Constants.manifest?.name ?? 'unknown-app' },
});

const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* TODO: add init db and migrations here */}
        <ThemeProvider theme={theme}>
          <AppSplashScreen />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
