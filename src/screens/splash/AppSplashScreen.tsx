import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from '../../navigation/drawer/Drawer';
import NoInternetConnectionOverlay from './NoInternetConnectionOverlay';
import ShowNotification from '../../components/ShowNotification';
import { NOTIFICATION_TYPE_NO_INTERNET_CONNECTION } from '../../model/NotificationType';
import InitializationAppFailureOverlay from './InitializationAppFailureOverlay';
import usePrepareResources from './usePrepareResources';

const AppSplashScreen: FC = () => {
  const {
    isAggregatesUpdated,
    initialStartupFailed,
    internetRequired,
    internetSuggested,
    onRetry,
  } = usePrepareResources();
  const [appIsReady, setAppReady] = useState<boolean | null>(null);

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .then(loadFonts)
      .finally(() => {
        setAppReady(true);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (
      appIsReady &&
      initialStartupFailed !== null &&
      internetRequired !== null &&
      internetSuggested !== null
    ) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, initialStartupFailed, internetRequired, internetSuggested]);

  if (
    !appIsReady ||
    initialStartupFailed === null ||
    internetRequired === null ||
    internetSuggested === null
  ) {
    return null;
  }

  if (internetRequired) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NoInternetConnectionOverlay
          onRetryButtonAction={() => {
            setAppReady(false);
            onRetry();
            setAppReady(true);
          }}
        />
      </View>
    );
  }

  if (initialStartupFailed) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <InitializationAppFailureOverlay />
      </View>
    );
  }

  if (
    initialStartupFailed === false &&
    internetRequired === false &&
    (isAggregatesUpdated || internetSuggested)
  ) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Drawer />
        {internetSuggested && (
          <ShowNotification
            notificationType={NOTIFICATION_TYPE_NO_INTERNET_CONNECTION}
          />
        )}
      </View>
    );
  }

  return <></>;
};

export default AppSplashScreen;
