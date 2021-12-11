import Bugsnag from '@bugsnag/expo';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
import Constants from 'expo-constants';
import { ThemeProvider } from 'react-native-elements';
import { PortalProvider } from 'react-native-portal';
import { LogBox } from 'react-native';
import AppSplashScreen from './src/screens/splash/AppSplashScreen';
import AuthProvider from './src/firebase/authentication/AuthProvider';
import environment from './src/util/environment';
import { store } from './src/redux/store';
import InitDatabaseProvider from './src/database/synchronize/initializeDatabase/InitDatabaseProvider';
import AggregateDataProvider from './src/database/synchronize/updateAggregates/AggregateDataProvider';
import RestoreAppProvider from './src/database/synchronize/restore/RestoreAppProvider';
import globalStyle from './src/styling/globalStyle';

const theme = {
  Chip: {
    theme: { colors: { primary: globalStyle.color.primary.main } },
  },
};

/**
 * We disable the warning below because it originate from the node modules dependency 'react-native-portal'.
 * This ignore log can be removed when a new version is available.
 * issue github: https://github.com/zenyr/react-native-portal/issues/19
 */
LogBox.ignoreLogs([
  'Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
]);

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
  metadata: { customer: environment.getEnvironment().customer },
});

const App: FC = () => {
  return (
    <PortalProvider>
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
    </PortalProvider>
  );
};

export default App;
