import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationsScreen from '../../screens/RegulationsScreen';
import SearchScreen from '../../screens/SearchScreen';
import RegulationDetailsScreen from '../../screens/RegulationDetailsScreen/RegulationDetailsScreen';
import Header from '../header/Header';
import HeaderLogo from '../header/HeaderLogo';
import ChapterPicker from '../header/ChapterPicker';

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
          header: () => (
            <Header navigation={navigation}>
              <HeaderLogo />
            </Header>
          ),
        }}
      />
      <Stack.Screen
        name="RegulationDetailsScreen"
        component={RegulationDetailsScreen}
        options={{
          header: () => (
            <Header navigation={navigation}>
              <ChapterPicker />
            </Header>
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
