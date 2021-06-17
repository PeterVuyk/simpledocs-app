import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from '../navigation/drawer/Drawer';
import prepareDatabaseResources from '../database/synchronize/prepareDatabaseResources';
import logger from '../helper/logger';
import NoInternetConnectionOverlay from '../overlay/NoInternetConnectionOverlay';
import internetConnectivity from '../helper/internetConnectivity';
import versioningRepository from '../database/repository/versioningRepository';
import { Versioning } from '../database/model/Versioning';
import ShowNotification from '../components/ShowNotification';

const AppSplashScreen: React.FC = () => {
  const [appIsReady, setAppReady] = useState<boolean>(false);
  const [versions, setVersions] = useState<Versioning[]>([]);
  const [startupIsSuccessful, setStartupIsSuccessful] =
    useState<boolean | null>(null);

  useEffect(() => {
    setStartupIsSuccessful(
      versions.every(version => version.version !== 'initial'),
    );
  }, [versions]);

  const showInternetConnectionNotification = async (): Promise<boolean> => {
    if (!startupIsSuccessful) {
      return false;
    }
    const hasInternetConnection =
      await internetConnectivity.hasInternetConnection();
    return startupIsSuccessful && !hasInternetConnection;
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  };

  useEffect(() => {
    if (appIsReady) {
      versioningRepository.getAllVersions(setVersions);
      return;
    }
    SplashScreen.preventAutoHideAsync()
      .then(loadFonts)
      .then(prepareDatabaseResources)
      .catch(reason =>
        logger.error('Failed initializing app by startup', reason),
      )
      .finally(() => {
        setAppReady(true);
      });
  }, [appIsReady]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {!startupIsSuccessful && (
        <NoInternetConnectionOverlay
          retryButtonHandler={() => {
            setAppReady(false);
            setStartupIsSuccessful(null);
          }}
        />
      )}
      {startupIsSuccessful && (
        <>
          {showInternetConnectionNotification() && (
            <ShowNotification notificationType="noInternetConnection" />
          )}
          <Drawer />
        </>
      )}
    </View>
  );
};

export default AppSplashScreen;
