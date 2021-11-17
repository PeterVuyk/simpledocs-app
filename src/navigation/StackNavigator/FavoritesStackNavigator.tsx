import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BookTabInfo } from '../../model/configurations/AppConfigurations';
import FavoritesScreen from '../../screens/favorites/FavoritesScreen';

const Stack = createStackNavigator();

interface Props {
  bookTabInfo: BookTabInfo;
}

const FavoritesStackNavigator: FC<Props> = ({ bookTabInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'float' }}>
      {bookTabInfo.bookTypes.length !== 1 && (
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{ header: () => null }}
        />
      )}
    </Stack.Navigator>
  );
};

export default FavoritesStackNavigator;
