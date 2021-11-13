import Bugsnag from '@bugsnag/expo';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
import Constants from 'expo-constants';
import { ThemeProvider } from 'react-native-elements';
import AppSplashScreen from './src/screens/splash/AppSplashScreen';
import AuthProvider from './src/firebase/authentication/AuthProvider';
import environment from './src/util/environment';
import { store } from './src/redux/store';
import InitDatabaseProvider from './src/database/synchronize/initializeDatabase/InitDatabaseProvider';
import AggregateDataProvider from './src/database/synchronize/updateAggregates/AggregateDataProvider';
import RestoreAppProvider from './src/database/synchronize/restore/RestoreAppProvider';

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
  releaseStage: environment.getEnvironment().envName,
  appVersion: Constants.manifest?.version ?? 'unknown-version',
  metadata: { company: Constants.manifest?.name ?? 'unknown-app' },
});

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RestoreAppProvider>
            <InitDatabaseProvider>
              <AggregateDataProvider>
                <AppSplashScreen />
              </AggregateDataProvider>
            </InitDatabaseProvider>
          </RestoreAppProvider>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
