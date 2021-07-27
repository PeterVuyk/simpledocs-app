import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { Versioning } from '../model/Versioning';
import ShowNotification from '../components/ShowNotification';
import { NOTIFICATION_TYPE_NO_INTERNET_CONNECTION } from '../model/NotificationType';

const AppSplashScreen: FC = () => {
  const [appIsReady, setAppReady] = useState<boolean | null>(null);
  const [hasInternetConnection, setInternetConnection] =
    useState<boolean>(false);
  const [versions, setVersions] = useState<Versioning[] | null>(null);
  const [startupIsSuccessful, setStartupIsSuccessful] = useState<
    boolean | null
  >(null);

  /**
   * After wait for startup we validate that all versions for aggregates/articleTypes are not initial
   * and at least 4 versions are set: 2 for aggregate 'articleTypes' and 2 for the last tab.
   * If this check fails then the user installed the app, turned off the internet and started the app.
   * Only the first time the user runs the app it requires internet. After it will be recommended to
   * receive the latest updates.
   */
  useEffect(() => {
    const MINIMUM_NUMBER_OF_VERSIONS = 4;
    if (versions !== null) {
      setStartupIsSuccessful(
        versions.length >= MINIMUM_NUMBER_OF_VERSIONS ||
          versions.every(version => version.version !== 'initial'),
      );
    }
  }, [startupIsSuccessful, versions]);

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
      .then(() =>
        internetConnectivity
          .hasInternetConnection()
          .then(connection => setInternetConnection(connection)),
      )
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
      {startupIsSuccessful === false && (
        <NoInternetConnectionOverlay
          retryButtonHandler={() => {
            setAppReady(false);
            setStartupIsSuccessful(null);
          }}
        />
      )}
      {startupIsSuccessful && (
        <>
          <Drawer />
          {!hasInternetConnection && (
            <ShowNotification
              notificationType={NOTIFICATION_TYPE_NO_INTERNET_CONNECTION}
            />
          )}
        </>
      )}
    </View>
  );
};

export default AppSplashScreen;
