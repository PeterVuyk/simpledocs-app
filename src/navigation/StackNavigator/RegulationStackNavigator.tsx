import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import RegulationsScreen from '../../screens/article/regulations/RegulationsScreen';
import RegulationDetailsScreen from '../../screens/article/regulations/RegulationDetailsScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const RegulationStackNavigator: FC<Props> = ({ navigation }) => {
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
            <Header
              navigation={navigation}
              showListButtonFromArticleType="regulations"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default RegulationStackNavigator;
