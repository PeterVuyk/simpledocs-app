import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Header from '../header/Header';
import ArticleDetailsScreen from '../../screens/article/ArticleDetailsScreen';
import ArticleListScreen from '../../screens/article/ArticleListScreen';
import { ARTICLE_TYPE_INSTRUCTION_MANUAL } from '../../model/ArticleType';

const Stack = createStackNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const InstructionManualStackNavigator: FC<Props> = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="InstructionManualScreen"
        component={ArticleListScreen}
        initialParams={{ articleType: ARTICLE_TYPE_INSTRUCTION_MANUAL }}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="InstructionManualIntermediateScreen"
        component={ArticleListScreen}
        options={{
          header: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="InstructionManualDetailsScreen"
        component={ArticleDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InstructionManualStackNavigator;
