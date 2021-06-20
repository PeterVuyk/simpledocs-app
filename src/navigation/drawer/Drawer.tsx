import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import TabNavigation from '../bottom/TabNavigation';

const DrawerNavigator = createDrawerNavigator();

const Drawer: FC = () => {
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
              progress={props.progress}
              navigation={props.navigation}
            />
          );
        }}
      >
        <DrawerNavigator.Screen name="tabs">
          {() => <TabNavigation />}
        </DrawerNavigator.Screen>
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Drawer;
