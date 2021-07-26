import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/search/SearchScreen';
import { ArticlesInfo } from '../../model/ArticlesInfo';

const Stack = createStackNavigator();

interface Props {
  articlesInfo: ArticlesInfo;
}

const SearchStackNavigator: FC<Props> = ({ articlesInfo }) => {
  return (
    <Stack.Navigator screenOptions={{ detachPreviousScreen: true }}>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        initialParams={{ articlesInfo }}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
