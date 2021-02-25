import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import TabNavigation from '../bottom/TabNavigation';

const DrawerNavigator = createDrawerNavigator();

const Drawer: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        drawerType="slide"
        drawerStyle={{ backgroundColor: 'white' }}
        overlayColor="transparant"
        drawerContentOptions={{
          activeBackgroundColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'white' }}
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
