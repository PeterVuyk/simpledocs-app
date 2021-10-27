import React, { FC } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import DrawerButton from './DrawerButton';
import SearchButton from './SearchButton';
import ArticleListButton from './ArticleListButton';
import HeaderLogo from './HeaderLogo';
import environment from '../../util/environment';

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    height: 110,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  rightContainer: {
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    marginRight: 20,
    marginBottom: 10,
  },
  editIndicator: {
    color: 'grey',
  },
});

interface Props {
  navigation: DrawerNavigationHelpers;
  showListButtonFromBookType?: string;
}

const Header: FC<Props> = ({ navigation, showListButtonFromBookType }) => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  return (
    <SafeAreaView style={headerStyles.container}>
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
      <HeaderLogo />
      {!environment.isProduction() && (
        <Icon
          name="edit-3"
          style={headerStyles.editIndicator}
          type="Feather"
          fontSize={20}
        />
      )}
      <View style={headerStyles.rightContainer}>
        {Platform.OS === 'ios' && (
          <DrawerButton
            iconName="dots-vertical"
            iconType="MaterialCommunityIcons"
            navigation={navigation}
          />
        )}
        <SearchButton navigation={navigation} />
        {showListButtonFromBookType !== undefined && (
          <ArticleListButton bookType={showListButtonFromBookType} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
