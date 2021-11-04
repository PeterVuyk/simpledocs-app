import React, { FC, useEffect } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import { AppConfigurations } from '../../model/AppConfigurations';
import SecondBookTabStackNavigator from '../StackNavigator/SecondBookTabStackNavigator';
import FirstBookTabStackNavigator from '../StackNavigator/FirstBookTabStackNavigator';
import { scrollUp } from '../../redux/slice/scrollingSlice';
import { useAppDispatch } from '../../redux/hooks';
import ResizeScreenDrawer from '../drawer/ResizeScreenDrawer';

const Tab = TabNavigator();

interface Props {
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
}

const TabNavigation: FC<Props> = ({ navigation, appConfigurations }) => {
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
    <ResizeScreenDrawer>
      <Tab.Navigator
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
            }}
          />
        )}
      </Tab.Navigator>
    </ResizeScreenDrawer>
  );
};

export default TabNavigation;
