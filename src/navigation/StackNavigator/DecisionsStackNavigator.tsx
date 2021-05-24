import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DecisionTreeScreen from '../../screens/decisions/DecisionTreeScreen';
import Header from '../header/Header';
import DecisionsScreen from '../../screens/decisions/DecisionsScreen';
import BreakingDistanceCalculatorScreen from '../../screens/decisions/breakingDistance/BreakingDistanceCalculatorScreen';
import BreakingDistanceDocumentationScreen from '../../screens/decisions/breakingDistance/BreakingDistanceDocumentationScreen';

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
        name="BreakingDistanceCalculatorScreen"
        component={BreakingDistanceCalculatorScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="BreakingDistanceDocumentationScreen"
        component={BreakingDistanceDocumentationScreen}
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
