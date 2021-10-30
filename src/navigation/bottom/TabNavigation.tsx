import React, { FC, useEffect, useState } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import AboutUsStackNavigator from '../StackNavigator/AboutUsStackNavigator';
import CopyrightStackNavigator from '../StackNavigator/CopyrightStackNavigator';
import { AppConfigurations } from '../../model/AppConfigurations';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import SearchStackNavigator from '../StackNavigator/SearchStackNavigator';
import { scrollUp } from '../../redux/slice/scrollingSlice';
import { useAppDispatch } from '../../redux/hooks';

const Tab = TabNavigator();

interface Props {
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation, appConfigurations }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(scrollUp());
    }, 400);
  }, [dispatch]);

  useEffect(() => {
    setDrawerProgressListener((updatedProgress: Animated.Value<0>) =>
      setProgress(updatedProgress),
    );
  }, []);

  const getInitialRoute = () => {
    switch (appConfigurations.defaultInitialTab) {
      case 'secondTab':
        return 'SecondBookTabStack';
      case 'decisionTab':
        return 'DecisionsScreenStack';
      case 'firstTab':
      default:
        return 'FirstBookTabStack';
    }
  };

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animatedStyle]}>
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
        initialRouteName={getInitialRoute()}
      >
        {appConfigurations.firstTab.bookTypes.length !== 0 && (
          <Tab.Screen
            name="FirstBookTabStack"
            children={() => (
              <FirstBookTabStackNavigator
                navigation={navigation}
                tabInfo={appConfigurations.firstTab}
              />
            )}
            options={{
              title: appConfigurations.firstTab.bottomTab.title,
              icon: appConfigurations.firstTab.bottomTab.icon,
              iconFamilyType: appConfigurations.firstTab.bottomTab.familyType,
              showInBottomBar: true,
            }}
          />
        )}
        {appConfigurations.secondTab.bookTypes.length !== 0 && (
          <Tab.Screen
            name="SecondBookTabStack"
            children={() => (
              <SecondBookTabStackNavigator
                navigation={navigation}
                tabInfo={appConfigurations.secondTab}
              />
            )}
            options={{
              title: appConfigurations.secondTab.bottomTab.title,
              icon: appConfigurations.secondTab.bottomTab.icon,
              iconFamilyType: appConfigurations.secondTab.bottomTab.familyType,
              showInBottomBar: true,
            }}
          />
        )}
        {appConfigurations.decisionsTab.indexDecisionType.length !== 0 && (
          <Tab.Screen
            name="DecisionsScreenStack"
            children={() => (
              <DecisionsStackNavigator
                navigation={navigation}
                decisionTabInfo={appConfigurations.decisionsTab}
              />
            )}
            options={{
              title: appConfigurations.decisionsTab.bottomTab.title,
              icon: appConfigurations.decisionsTab.bottomTab.icon,
              iconFamilyType:
                appConfigurations.decisionsTab.bottomTab.familyType,
              showInBottomBar: true,
            }}
          />
        )}
        <Tab.Screen
          name="SearchStack"
          children={() => (
            <SearchStackNavigator appConfigurations={appConfigurations} />
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
    </Animated.View>
  );
};

export default TabNavigation;
