import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DecisionsOverviewScreen from '../../screens/decisions/DecisionsOverviewScreen';
import DocumentationScreen from '../../screens/decisions/DocumentationScreen';
import { DecisionsTab } from '../../model/configurations/AppConfigurations';
import DecisionScreen from '../../screens/decisions/DecisionScreen';

const Stack = createStackNavigator();

interface Props {
  decisionTabInfo: DecisionsTab;
}

const DecisionsStackNavigator: FC<Props> = ({ decisionTabInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'float' }}>
      <Stack.Screen
        name="DecisionsOverviewScreen"
        component={DecisionsOverviewScreen}
        initialParams={{ decisionTabInfo }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="DecisionScreen"
        component={DecisionScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="DocumentationScreen"
        component={DocumentationScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default DecisionsStackNavigator;
