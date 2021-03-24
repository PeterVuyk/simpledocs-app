import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationsScreen from '../../screens/RegulationsScreen';
import SearchScreen from '../../screens/SearchScreen';
import RegulationDetailsScreen from '../../screens/RegulationDetailsScreen/RegulationDetailsScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const RegulationStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} headerMode="screen">
      <Stack.Screen name="RegulationsScreen" component={RegulationsScreen} />
      <Stack.Screen
        name="RegulationDetailsScreen"
        component={RegulationDetailsScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default RegulationStackNavigator;
