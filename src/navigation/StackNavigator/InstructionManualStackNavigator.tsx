import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import InstructionManualScreen from '../../screens/article/instructionManual/InstructionManualScreen';
import ArticleDetailsScreen from '../../screens/article/ArticleDetailsScreen';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const InstructionManualStackNavigator: FC<Props> = ({ navigation }) => {
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
        component={ArticleDetailsScreen}
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
