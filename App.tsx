import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { decode, encode } from 'base-64';
import { ThemeProvider } from 'react-native-elements';
import { PortalProvider } from 'react-native-portal';
import { LogBox } from 'react-native';
import * as Sentry from 'sentry-expo';
import { NativeBaseProvider } from 'native-base';
import AppSplashScreen from './src/screens/splash/AppSplashScreen';
import AuthProvider from './src/firebase/authentication/AuthProvider';
import environment from './src/util/environment';
import { store } from './src/redux/store';
import InitDatabaseProvider from './src/database/synchronize/initializeDatabase/InitDatabaseProvider';
import AggregateDataProvider from './src/database/synchronize/updateAggregates/AggregateDataProvider';
import RestoreAppProvider from './src/database/synchronize/restore/RestoreAppProvider';
import UncaughtErrorHandler from './src/components/UncaughtErrorHandler';
import nativeBaseTheme from './src/styling/nativeBaseTheme';
import reactNativeElementsTheme from './src/styling/reactNativeElementsTheme';

/**
 * We disable the warning below because it originate from the node modules dependency 'react-native-portal'.
 * This ignore log can be removed when a new version is available.
 * issue github: https://github.com/zenyr/react-native-portal/issues/19
 */
LogBox.ignoreLogs([
  'Warning: componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
  "Constants.deviceYearClass has been deprecated in favor of expo-device's Device.deviceYearClass property. This API will be removed in SDK 45.",
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

Sentry.init({
  dsn: process.env.SENTRY_DATA_SOURCE_NAME,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: environment.isProduction() ? 0.4 : 1.0,
  enableInExpoDevelopment: true,
  debug: !environment.isProduction(),
  release: environment.getEnvironment().envName,
  integrations: [new Sentry.Native.ReactNativeTracing()],
});

const App: FC = () => {
  return (
    <PortalProvider>
      <Provider store={store}>
        <NativeBaseProvider theme={nativeBaseTheme}>
          <ThemeProvider theme={reactNativeElementsTheme}>
            <UncaughtErrorHandler>
              <AuthProvider>
                <RestoreAppProvider>
                  <InitDatabaseProvider>
                    <AggregateDataProvider>
                      <AppSplashScreen />
                    </AggregateDataProvider>
                  </InitDatabaseProvider>
                </RestoreAppProvider>
              </AuthProvider>
            </UncaughtErrorHandler>
          </ThemeProvider>
        </NativeBaseProvider>
      </Provider>
    </PortalProvider>
  );
};

export default App;
