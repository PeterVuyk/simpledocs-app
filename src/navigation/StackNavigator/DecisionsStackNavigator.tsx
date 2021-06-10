import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DecisionTreeScreen from '../../screens/decisions/decisionTree/DecisionTreeScreen';
import Header from '../header/Header';
import DecisionsScreen from '../../screens/decisions/DecisionsScreen';
import CalculatorScreen from '../../screens/decisions/calculator/CalculatorScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const DecisionsStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DecisionsScreen"
        component={DecisionsScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="calculatorScreen"
        component={CalculatorScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="DecisionTreeScreen"
        component={DecisionTreeScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default DecisionsStackNavigator;
