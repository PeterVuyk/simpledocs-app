import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import InfoScreen from '../../screens/InfoScreen';
import Header from '../header/Header';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const InfoStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default InfoStackNavigator;
