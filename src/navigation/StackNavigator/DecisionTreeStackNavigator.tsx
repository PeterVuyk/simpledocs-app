import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DecisionTreeScreen from '../../screens/DecisionTreeScreen';
import Header from '../header/Header';
import HeaderLogo from '../header/HeaderLogo';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const DecisionTreeStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DecisionTreeScreen"
        component={DecisionTreeScreen}
        options={{
          header: () => (
            <Header navigation={navigation}>
              <HeaderLogo />
            </Header>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DecisionTreeStackNavigator;
