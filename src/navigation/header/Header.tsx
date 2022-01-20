import React, { FC } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { WhitePortal } from 'react-native-portal';
import { Icon } from 'native-base';
import DrawerButton from './DrawerButton';
import SearchButton from './search/SearchButton';
import HeaderLogo from './HeaderLogo';
import globalStyle from '../../styling/globalStyle';

export const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: globalStyle.header.backgroundColor,
    alignItems: 'center',
  },
  rightContainer: {
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    marginRight: 20,
    marginBottom: 10,
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
}

const Header: FC<Props> = ({ navigation }) => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  return (
    <SafeAreaView style={headerStyles.headerContainer}>
      {Platform.OS === 'ios' && navigator.canGoBack() && (
        <HeaderBackButton onPress={navigator.goBack} />
      )}
      {Platform.OS !== 'ios' && (
        <DrawerButton
          iconName="menu"
          iconType="MaterialCommunityIcons"
          navigation={navigation}
        />
      )}
      <View style={{ width: 50 }} />
      <HeaderLogo />
      <View style={headerStyles.rightContainer}>
        {Platform.OS === 'ios' && (
          <DrawerButton
            iconName="dots-vertical"
            iconType="MaterialCommunityIcons"
            navigation={navigation}
          />
        )}
        <SearchButton navigation={navigation} />
        <WhitePortal name="bookmarkToggle">
          {/* The icon below is a placeholder and is only rendered if the bookmarkToggle isn't set. Added this so the header logo stay fixed independent if bookmarkToggle is set */}
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
      </View>
    </SafeAreaView>
  );
};

export default Header;
