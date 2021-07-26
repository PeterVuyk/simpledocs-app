import React, { FC, useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import AboutUsStackNavigator from '../StackNavigator/AboutUsStackNavigator';
import CopyrightStackNavigator from '../StackNavigator/CopyrightStackNavigator';
import articleTypeHelper from '../../helper/articleTypeHelper';
import { FIRST_ARTICLE_TAB, SECOND_ARTICLE_TAB } from '../../model/ArticleType';
import { ArticlesInfo } from '../../model/ArticlesInfo';
import SecondArticleTabStackNavigator from '../StackNavigator/SecondArticleTabStackNavigator';
import FirstArticleTabStackNavigator from '../StackNavigator/FirstArticleTabStackNavigator';
import SearchStackNavigator from '../StackNavigator/SearchStackNavigator';

const Tab = TabNavigator();

interface Props {
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation }) => {
  const [secondTabConfig, setSecondTabConfig] = useState<ArticlesInfo | null>(
    null,
  );
  const [firstTabConfig, setFirstTabConfig] = useState<ArticlesInfo | null>(
    null,
  );
  useEffect(() => {
    setFirstTabConfig(
      articleTypeHelper.getArticlesInfoByTab(FIRST_ARTICLE_TAB),
    );
    setSecondTabConfig(
      articleTypeHelper.getArticlesInfoByTab(SECOND_ARTICLE_TAB),
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
      {secondTabConfig && firstTabConfig && (
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
          initialRouteName="SecondArticleTabStack"
        >
          <Tab.Screen
            name="FirstArticleTabStack"
            children={() => (
              <FirstArticleTabStackNavigator
                navigation={navigation}
                articlesInfo={firstTabConfig}
              />
            )}
            options={{
              title: firstTabConfig.bottomTab.title,
              icon: firstTabConfig.bottomTab.icon,
              iconFamilyType: firstTabConfig.bottomTab.familyType,
              showInBottomBar: true,
            }}
          />
          <Tab.Screen
            name="SecondArticleTabStack"
            children={() => (
              <SecondArticleTabStackNavigator
                navigation={navigation}
                articlesInfo={secondTabConfig}
              />
            )}
            options={{
              title: secondTabConfig.bottomTab.title,
              icon: secondTabConfig.bottomTab.icon,
              iconFamilyType: secondTabConfig.bottomTab.familyType,
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
            children={() => (
              <SearchStackNavigator articlesInfo={secondTabConfig} />
            )}
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
