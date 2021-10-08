import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import DecisionsOverviewScreen from '../../screens/decisions/DecisionsOverviewScreen';
import DocumentationScreen from '../../screens/decisions/DocumentationScreen';
import { DecisionsTab } from '../../model/AppConfigurations';
import DecisionScreen from '../../screens/decisions/DecisionScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  decisionTabInfo: DecisionsTab;
}

const DecisionsStackNavigator: FC<Props> = ({
  navigation,
  decisionTabInfo,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DecisionsOverviewScreen"
        component={DecisionsOverviewScreen}
        initialParams={{ decisionTabInfo }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="DecisionScreen"
        component={DecisionScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="DocumentationScreen"
        component={DocumentationScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default DecisionsStackNavigator;
