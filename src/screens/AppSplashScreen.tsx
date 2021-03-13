import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Drawer from '../navigation/drawer/Drawer';
import prepareDatabaseResources from '../database/prepareDatabaseResources';

const AppSplashScreen: React.FC = () => {
  const [appIsReady, setAppReady] = React.useState<boolean>(false);

  useEffect(() => {
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
