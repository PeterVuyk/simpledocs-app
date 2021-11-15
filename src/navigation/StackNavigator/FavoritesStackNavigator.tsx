import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
  bookTabInfo: BookTabInfo;
}

const FavoritesStackNavigator: FC<Props> = ({ navigation, bookTabInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'screen' }}>
      {bookTabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            header: () => <Header navigation={navigation} />,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default FavoritesStackNavigator;
