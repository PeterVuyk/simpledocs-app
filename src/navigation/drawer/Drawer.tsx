import React, { FC, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import TabNavigation from '../bottom/TabNavigation';
import { AppConfigurations } from '../../model/AppConfigurations';
import configurationsStorage from '../../storage/configurationsStorage';
import CopyrightScreen from '../../screens/drawerScreens/copyright/CopyrightScreen';
import SearchScreen from '../../screens/drawerScreens/search/SearchScreen';
import AboutUsScreen from '../../screens/drawerScreens/about/AboutUsScreen';

const DrawerNavigator = createDrawerNavigator();

const Drawer: FC = () => {
  const [appConfigurations, setAppConfigurations] =
    useState<AppConfigurations | null>(null);

  useEffect(() => {
    configurationsStorage.getSystemConfiguration().then(config => {
      setAppConfigurations(config!.appConfigurations!);
    });
  }, []);

  if (!appConfigurations) {
    return null;
  }

  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          drawerStyle: { backgroundColor: '#fff' },
          overlayColor: 'transparant',
          lazy: true,
          drawerActiveBackgroundColor: '#fff',
          sceneContainerStyle: { backgroundColor: '#fff' },
        }}
        initialRouteName="tabs"
        drawerContent={props => {
          return (
            <DrawerContent
              appConfigurations={appConfigurations}
              navigation={props.navigation}
            />
          );
        }}
      >
        <DrawerNavigator.Screen name="tabs">
          {props => (
            <TabNavigation
              navigation={props.navigation}
              appConfigurations={appConfigurations}
            />
          )}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="CopyrightScreen">
          {props => (
            <CopyrightScreen
              appConfigurations={appConfigurations}
              navigation={props.navigation}
            />
          )}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="SearchScreen">
          {props => (
            <SearchScreen
              navigation={props.navigation}
              appConfigurations={appConfigurations}
            />
          )}
        </DrawerNavigator.Screen>
        <DrawerNavigator.Screen name="AboutUsScreen">
          {props => (
            <AboutUsScreen
              navigation={props.navigation}
              appConfigurations={appConfigurations}
            />
          )}
        </DrawerNavigator.Screen>
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Drawer;
