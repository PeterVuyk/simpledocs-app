import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/search/SearchScreen';
import { AppConfigurations } from '../../model/AppConfigurations';

const Stack = createStackNavigator();

interface Props {
  appConfigurations: AppConfigurations;
}

const SearchStackNavigator: FC<Props> = ({ appConfigurations }) => {
  return (
    <Stack.Navigator screenOptions={{ detachPreviousScreen: true }}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        initialParams={{ appConfigurations }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
