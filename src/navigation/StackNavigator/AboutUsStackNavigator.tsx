import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import AboutUsScreen from '../../screens/about/AboutUsScreen';
import Header from '../header/Header';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const AboutUsStackNavigator: FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ detachPreviousScreen: true }}>
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AboutUsStackNavigator;
