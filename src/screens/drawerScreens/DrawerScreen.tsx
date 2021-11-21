import React, { FC, ReactNode } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { AppConfigurations } from '../../model/configurations/AppConfigurations';
import BottomTabs from '../../navigation/bottom/BottomTabs';
import Header from '../../navigation/header/Header';
import BottomTab from '../../model/BottomTab';
import ResizeScreenDrawer from '../../navigation/drawer/ResizeScreenDrawer';
import { IconFamilyType } from '../../model/style/IconFamilyType';

interface Props {
  children: ReactNode;
  appConfigurations: AppConfigurations;
  navigation: DrawerNavigationHelpers;
  showHeader?: boolean;
}

const DrawerScreen: FC<Props> = ({
  children,
  navigation,
  appConfigurations,
  showHeader,
}) => {
  const getBottomTab = (): BottomTab[] => {
    const tabs = [];
    tabs.push({
      index: 0,
      title: 'Favorieten',
      icon: 'bookmark-check',
      iconFamilyType: 'MaterialCommunityIcons' as IconFamilyType,
      isSelected: false,
      onPress: () =>
        navigation.navigate('BookmarkTabStack', {
          screen: 'BookmarkScreen',
        }),
    });
    if (appConfigurations.firstBookTab.bookTypes.length !== 0) {
      tabs.push({
        index: 1,
        title: appConfigurations.firstBookTab.bottomTab.title,
        icon: appConfigurations.firstBookTab.bottomTab.icon,
        iconFamilyType: appConfigurations.firstBookTab.bottomTab.familyType,
        isSelected: false,
        onPress: () =>
          navigation.navigate('FirstBookTabStack', {
            screen: 'FirstBookTabOverviewScreen',
          }),
      });
    }
    if (appConfigurations.secondBookTab.bookTypes.length !== 0) {
      tabs.push({
        index: 2,
        title: appConfigurations.secondBookTab.bottomTab.title,
        icon: appConfigurations.secondBookTab.bottomTab.icon,
        iconFamilyType: appConfigurations.secondBookTab.bottomTab.familyType,
        isSelected: false,
        onPress: () =>
          navigation.navigate('SecondBookTabStack', {
            screen: 'SecondBookTabOverviewScreen',
          }),
      });
    }
    if (appConfigurations.decisionsTab.indexDecisionType.length !== 0) {
      tabs.push({
        index: 3,
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
