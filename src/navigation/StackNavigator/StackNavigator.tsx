import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import AboutUsScreen from '../../screens/about/AboutUsScreen';
import Header from '../header/Header';
import CopyrightScreen from '../../screens/copyright/CopyrightScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const StackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="CopyrightScreen"
        component={CopyrightScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
