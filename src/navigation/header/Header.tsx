import React, { FC } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { WhitePortal } from 'react-native-portal';
import { Icon } from 'native-base';
import DrawerButton from './DrawerButton';
import SearchButton from './search/SearchButton';
import globalStyle from '../../styling/globalStyle';
import HeaderLogo from './HeaderLogo';

export const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 80,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: globalStyle.header.backgroundColor,
    zIndex: 999,
  },
  box: {
    flex: 0.5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoBox: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
}

const Header: FC<Props> = ({ navigation }) => {
  const getBookmark = () => {
    return (
      <WhitePortal name="bookmarkToggle">
        {/* The icon below is a placeholder and is only rendered if the bookmarkToggle isn't set.
          Added this so the header logo stay fixed independent if bookmarkToggle is set */}
        <Icon
          style={{
            color: globalStyle.color.white,
            padding: 10,
            opacity: 0.0,
          }}
          name="bookmark-plus-outline"
          type="MaterialCommunityIcons"
        />
      </WhitePortal>
    );
  };

  return (
    <SafeAreaView style={headerStyles.container}>
      <View style={headerStyles.box}>
        {Platform.OS === 'ios' && <WhitePortal name="goBackButton" />}
        {Platform.OS === 'android' && (
          <DrawerButton
            iconName="menu"
            iconType="MaterialCommunityIcons"
            navigation={navigation}
          />
        )}
        {Platform.OS === 'ios' && getBookmark()}
      </View>
      <View style={headerStyles.logoBox}>
        <HeaderLogo />
      </View>
      <View style={[headerStyles.box, { flexDirection: 'row-reverse' }]}>
        {Platform.OS === 'ios' && (
          <DrawerButton
            iconName="dots-vertical"
            iconType="MaterialCommunityIcons"
            navigation={navigation}
          />
        )}
        <SearchButton navigation={navigation} />
        {Platform.OS === 'android' && getBookmark()}
      </View>
    </SafeAreaView>
  );
};

export default Header;
