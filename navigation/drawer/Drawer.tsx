import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import TabNavigation from '../bottom/TabNavigation';

const DrawerNavigator = createDrawerNavigator();

const Drawer: React.FC = () => {
  return (
    <DrawerNavigator.Navigator
      // style={{ width: 1100 }}
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
  );
};

export default Drawer;
