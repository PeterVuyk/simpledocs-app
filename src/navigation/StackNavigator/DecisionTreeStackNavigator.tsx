import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import DecisionTreeScreen from '../../screens/DecisionTreeScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const DecisionTreeStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DecisionTreeScreen" component={DecisionTreeScreen} />
    </Stack.Navigator>
  );
};

export default DecisionTreeStackNavigator;
