import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Drawer from './Drawer';

const DrawerNavigator = createDrawerNavigator();

const DrawerContainer: React.FC = () => {
  return (
    //  TODO: merge with Drawer element
    <NavigationContainer>
      <DrawerNavigator.Navigator>
        <DrawerNavigator.Screen name="RegulationsScreen" component={Drawer} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default DrawerContainer;
