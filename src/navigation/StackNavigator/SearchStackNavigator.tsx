import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/search/SearchScreen';
import { ConfigInfo } from '../../model/ConfigInfo';

const Stack = createStackNavigator();

interface Props {
  configInfo: ConfigInfo;
}

const SearchStackNavigator: FC<Props> = ({ configInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ detachPreviousScreen: true }}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        initialParams={{ configInfo }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
