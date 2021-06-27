import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import RegulationsScreen from '../../screens/article/regulations/RegulationsScreen';
import RegulationArticlesScreen from '../../screens/article/regulations/RegulationArticlesScreen';
import ArticleDetailsScreen from '../../screens/article/ArticleDetailsScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const RegulationStackNavigator: FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="RegulationArticlesScreen"
        component={RegulationArticlesScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RegulationsScreen"
        component={RegulationsScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RegulationDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RegulationStackNavigator;
