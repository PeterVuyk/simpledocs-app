import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationsScreen from '../../screens/RegulationsScreen';
import SearchScreen from '../../screens/SearchScreen';
import RegulationDetailsScreen from '../../screens/RegulationDetailsScreen/RegulationDetailsScreen';
import Header from '../header/Header';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const RegulationStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="RegulationsScreen"
        component={RegulationsScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RegulationDetailsScreen"
        component={RegulationDetailsScreen}
        options={{
          header: () => (
            <Header navigation={navigation} showRegulationsListButton />
          ),
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RegulationStackNavigator;
