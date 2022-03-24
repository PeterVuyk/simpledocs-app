import React, { FC, useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import TabNavigation from '../bottom/TabNavigation';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import configurationsStorage from '../../storage/configurationsStorage';
import globalStyle from '../../styling/globalStyle';
import SearchScreen from '../../screens/drawerScreens/search/SearchScreen';
import BackPressListener from '../BackPressListener';
import AggregateDataOnReadyProvider from '../../database/synchronize/updateAggregates/AggregateDataOnReadyProvider';
import DisclaimerScreen from '../../screens/drawerScreens/disclaimer/DisclaimerScreen';

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
    <AggregateDataOnReadyProvider>
      <BackPressListener>
        <DrawerNavigator.Navigator
          screenOptions={{
            swipeEnabled: false,
            headerShown: false,
            drawerType: 'slide',
            drawerStyle: { backgroundColor: globalStyle.color.white },
            overlayColor: 'transparant',
            lazy: true,
            drawerActiveBackgroundColor: globalStyle.color.white,
            sceneContainerStyle: { backgroundColor: globalStyle.color.white },
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
          <DrawerNavigator.Screen name="DisclaimerScreen">
            {props => (
              <DisclaimerScreen
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
        </DrawerNavigator.Navigator>
      </BackPressListener>
    </AggregateDataOnReadyProvider>
  );
};

export default Drawer;
