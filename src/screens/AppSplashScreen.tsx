import React, { useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from '../navigation/drawer/Drawer';
import prepareDatabaseResources from '../database/synchronize/prepareDatabaseResources';
import logger from '../helper/logger';
import NoInternetConnectionOverlay from '../overlay/NoInternetConnectionOverlay';
import internetConnectivity from '../helper/internetConnectivity';
import versioningRepository, {
  Versioning,
} from '../database/repository/versioningRepository';
import notificationRepository, {
  Notification,
} from '../database/repository/notificationRepository';

const AppSplashScreen: React.FC = () => {
  const [appIsReady, setAppReady] = React.useState<boolean>(false);
  const [versions, setVersions] = React.useState<Versioning[]>([]);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [startupIsSuccessful, setStartupIsSuccessful] =
    React.useState<boolean | null>(null);

  useEffect(() => {
    setStartupIsSuccessful(
      versions.every(version => version.version !== 'initial'),
    );
  }, [versions]);

  useEffect(() => {
    if (!startupIsSuccessful || notifications.length === 0) {
      return;
    }

    const internetNotification = notifications.find(
      value => value.notificationType === 'noInternetConnection',
    );
    internetConnectivity.hasInternetConnection().then(connected => {
      if (
        startupIsSuccessful &&
        !connected &&
        internetNotification !== undefined &&
        internetNotification.notificationEnabled
      ) {
        Alert.alert(
          'Er is geen internet beschikbaar',
          'De app performt het beste met een internet verbinding, zo ontvang je van ons de laatste wijzigingen en worden alle afbeeldingen juist weergegeven.',
          [
            {
              text: 'Niet meer melden',
              onPress: () =>
                notificationRepository.updateNotification({
                  notificationType: 'noInternetConnection',
                  notificationEnabled: false,
                }),
            },
            { text: 'OK', onPress: () => null },
          ],
        );
      }
    });
  }, [startupIsSuccessful, notifications]);

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
      .then(() => notificationRepository.getNotifications(setNotifications))
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
      {startupIsSuccessful && <Drawer />}
    </View>
  );
};

export default AppSplashScreen;
