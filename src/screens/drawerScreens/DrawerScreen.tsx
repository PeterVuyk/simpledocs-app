import React, { FC, ReactNode } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { AppConfigurations } from '../../model/AppConfigurations';
import BottomTabs from '../../navigation/bottom/BottomTabs';
import Header from '../../navigation/header/Header';
import BottomTab from '../../model/BottomTab';
import ResizeScreenDrawer from '../../navigation/drawer/ResizeScreenDrawer';

interface Props {
  children: ReactNode;
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
  showHeader: boolean;
}

const DrawerScreen: FC<Props> = ({
  children,
  navigation,
  appConfigurations,
  showHeader,
}) => {
  const getBottomTab = (): BottomTab[] => {
    const tabs = [];
    if (appConfigurations.firstTab.bookTypes.length !== 0) {
      tabs.push({
        index: 0,
        title: appConfigurations.firstTab.bottomTab.title,
        icon: appConfigurations.firstTab.bottomTab.icon,
        iconFamilyType: appConfigurations.firstTab.bottomTab.familyType,
        isSelected: false,
        onPress: () =>
          navigation.navigate('FirstBookTabStack', {
            screen: 'FirstBookTabOverviewScreen',
          }),
      });
    }
    if (appConfigurations.secondTab.bookTypes.length !== 0) {
      tabs.push({
        index: 1,
        title: appConfigurations.secondTab.bottomTab.title,
        icon: appConfigurations.secondTab.bottomTab.icon,
        iconFamilyType: appConfigurations.secondTab.bottomTab.familyType,
        isSelected: false,
        onPress: () =>
          navigation.navigate('SecondBookTabStack', {
            screen: 'SecondBookTabOverviewScreen',
          }),
      });
    }
    if (appConfigurations.decisionsTab.indexDecisionType.length !== 0) {
      tabs.push({
        index: 2,
        title: appConfigurations.decisionsTab.bottomTab.title,
        icon: appConfigurations.decisionsTab.bottomTab.icon,
        iconFamilyType: appConfigurations.decisionsTab.bottomTab.familyType,
        isSelected: false,
        onPress: () =>
          navigation.navigate('DecisionsScreenStack', {
            screen: 'DecisionsOverviewScreen',
          }),
      });
    }
    return tabs;
  };

  return (
    <ResizeScreenDrawer>
      {showHeader && <Header navigation={navigation} />}
      {children}
      <BottomTabs tabs={getBottomTab()} />
    </ResizeScreenDrawer>
  );
};

export default DrawerScreen;
