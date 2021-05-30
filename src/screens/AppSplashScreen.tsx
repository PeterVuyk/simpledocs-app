import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from '../navigation/drawer/Drawer';
import prepareDatabaseResources from '../database/synchronize/prepareDatabaseResources';
import logger from '../helper/logger';

const AppSplashScreen: React.FC = () => {
  const [appIsReady, setAppReady] = React.useState<boolean>(false);

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
      .then(prepareDatabaseResources)
      .catch(reason =>
        logger.error('Failed initializing app by startup', reason),
      )
      .finally(() => {
        setAppReady(true);
      });
  }, []);

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
      <Drawer />
    </View>
  );
};

export default AppSplashScreen;
