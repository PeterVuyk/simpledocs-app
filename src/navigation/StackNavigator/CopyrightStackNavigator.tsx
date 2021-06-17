import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import CopyrightScreen from '../../screens/copyright/CopyrightScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const CopyrightStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ detachPreviousScreen: true }}>
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

export default CopyrightStackNavigator;
