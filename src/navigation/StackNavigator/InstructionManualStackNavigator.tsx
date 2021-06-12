import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import InstructionManualDetailsScreen from '../../screens/article/instructionManual/InstructionManualDetailsScreen';
import InstructionManualScreen from '../../screens/article/instructionManual/InstructionManualScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const InstructionManualStackNavigator: React.FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="InstructionManualScreen"
        component={InstructionManualScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="InstructionManualDetailsScreen"
        component={InstructionManualDetailsScreen}
        options={{
          header: () => (
            <Header
              navigation={navigation}
              showListButtonFromArticleType="instructionManual"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default InstructionManualStackNavigator;
