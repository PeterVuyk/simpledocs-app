import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Drawer from '../navigation/drawer/Drawer';
import prepareDatabaseResources from '../database/prepareDatabaseResources';

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
    loadFonts();
    SplashScreen.preventAutoHideAsync();
    try {
      prepareDatabaseResources();
    } finally {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!appIsReady && null}
      {appIsReady && <Drawer />}
    </View>
  );
};

export default AppSplashScreen;
