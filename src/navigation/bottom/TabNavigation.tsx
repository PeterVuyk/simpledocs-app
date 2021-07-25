import React, { FC, useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import RegulationStackNavigator from '../StackNavigator/RegulationStackNavigator';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import InstructionManualStackNavigator from '../StackNavigator/InstructionManualStackNavigator';
import AboutUsStackNavigator from '../StackNavigator/AboutUsStackNavigator';
import CopyrightStackNavigator from '../StackNavigator/CopyrightStackNavigator';
import SearchStackNavigator from '../StackNavigator/SearchStackNavigator';
import articleTypeHelper, {
  ArticlesInfo,
} from '../../helper/articleTypeHelper';
import {
  ARTICLE_TAB_INSTRUCTION_MANUAL,
  ARTICLE_TAB_REGULATIONS,
} from '../../model/ArticleType';

const Tab = TabNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation }) => {
  const [regulationsConfig, setRegulationsConfig] =
    useState<ArticlesInfo | null>(null);
  const [instructionManualConfig, setInstructionManualConfig] =
    useState<ArticlesInfo | null>(null);
  useEffect(() => {
    setInstructionManualConfig(
      articleTypeHelper.getArticlesInfoByTab(ARTICLE_TAB_INSTRUCTION_MANUAL),
    );
    setRegulationsConfig(
      articleTypeHelper.getArticlesInfoByTab(ARTICLE_TAB_REGULATIONS),
    );
  }, []);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };

  useEffect(() => {
    setDrawerProgressListener((updatedProgress: Animated.Value<0>) =>
      setProgress(updatedProgress),
    );
  }, []);

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animatedStyle]}>
      {regulationsConfig && instructionManualConfig && (
        <Tab.Navigator
          tabBarStyle={{
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: '#154594',
          }}
          contentStyle={{
            height: 60,
          }}
          initialRouteName="RegulationsScreenStack"
        >
          <Tab.Screen
            name="InstructionManualStack"
            children={() => (
              <InstructionManualStackNavigator
                navigation={navigation}
                articlesInfo={instructionManualConfig}
              />
            )}
            options={{
              title: instructionManualConfig.bottomTab.title,
              icon: instructionManualConfig.bottomTab.icon,
              iconFamilyType: instructionManualConfig.bottomTab.familyType,
              showInBottomBar: true,
            }}
          />
          <Tab.Screen
            name="RegulationsScreenStack"
            children={() => (
              <RegulationStackNavigator
                navigation={navigation}
                articlesInfo={regulationsConfig}
              />
            )}
            options={{
              title: regulationsConfig.bottomTab.title,
              icon: regulationsConfig.bottomTab.icon,
              iconFamilyType: regulationsConfig.bottomTab.familyType,
              showInBottomBar: true,
            }}
          />
          <Tab.Screen
            name="DecisionsScreenStack"
            component={DecisionsStackNavigator}
            options={{
              title: 'Besluitvorming',
              icon: 'arrow-decision',
              showInBottomBar: true,
            }}
          />
          <Tab.Screen
            name="SearchStack"
            component={SearchStackNavigator}
            options={{
              title: 'Info',
              icon: 'information-outline',
              showInBottomBar: false,
            }}
          />
          <Tab.Screen
            name="AboutUsStack"
            component={AboutUsStackNavigator}
            options={{
              title: 'Info',
              icon: 'information-outline',
              showInBottomBar: false,
            }}
          />
          <Tab.Screen
            name="CopyrightStack"
            component={CopyrightStackNavigator}
            options={{
              title: 'Info',
              icon: 'information-outline',
              showInBottomBar: false,
            }}
          />
        </Tab.Navigator>
      )}
    </Animated.View>
  );
};

export default TabNavigation;
