import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookmarkScreen from '../../screens/bookmarks/BookmarkScreen';

const Stack = createStackNavigator();

const BookmarksStackNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerMode: 'float' }}>
      <Stack.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default BookmarksStackNavigator;
