import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from '../../navigation/drawer/Drawer';
import NoInternetConnectionOverlay from './NoInternetConnectionOverlay';
import InitializationAppFailureOverlay from './InitializationAppFailureOverlay';
import IntentSplashScreen from './IntentSplashScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  AUTHENTICATE_STATE,
  INTERNET_REQUIRED_STATE,
  STARTUP_FAILURE_STATE,
  STARTUP_SUCCESSFUL_STATE,
  updateStartupState,
} from '../../redux/slice/startupStateSlice';
import InternetSuggestedNotification from '../../components/notification/InternetSuggestedNotification';
import BackPressListener from '../../navigation/BackPressListener';

const AppSplashScreen: FC = () => {
  const [appIsReady, setAppReady] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentStartupState = useAppSelector(
    state => state.startupState.currentState,
  );
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    setLoading(
      ![STARTUP_SUCCESSFUL_STATE, STARTUP_FAILURE_STATE].includes(
        currentStartupState,
      ),
    );
  }, [currentStartupState]);

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

  if (currentStartupState === INTERNET_REQUIRED_STATE) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NoInternetConnectionOverlay
          onRetryButtonAction={() => {
            dispatch(updateStartupState(AUTHENTICATE_STATE));
          }}
        />
      </View>
    );
  }

  if (currentStartupState === STARTUP_FAILURE_STATE) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <InitializationAppFailureOverlay />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {loading && <IntentSplashScreen />}
      {!loading && (
        <InternetSuggestedNotification>
          <Drawer />
        </InternetSuggestedNotification>
      )}
    </View>
  );
};

export default AppSplashScreen;
