import React, { FC, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import TabNavigation from '../bottom/TabNavigation';
import { AppConfigurations } from '../../model/AppConfigurations';
import configurationsStorage from '../../configurations/configurationsStorage';

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
        drawerType="slide"
        drawerStyle={{ backgroundColor: '#fff' }}
        overlayColor="transparant"
        drawerContentOptions={{
          activeBackgroundColor: '#fff',
        }}
        sceneContainerStyle={{ backgroundColor: '#fff' }}
        drawerContent={props => {
          return (
            <DrawerContent
              appConfigurations={appConfigurations}
              progress={props.progress}
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
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Drawer;
