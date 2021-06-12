import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DrawerButton from './DrawerButton';
import SearchButton from './SearchButton';
import ArticleListButton from './ArticleListButton';
import HeaderLogo from './HeaderLogo';
import { ArticleType } from '../../database/model/ArticleType';

interface Props {
  navigation: DrawerNavigationHelpers;
  showListButtonFromArticleType?: ArticleType;
}

const Header: React.FC<Props> = ({
  navigation,
  showListButtonFromArticleType,
}) => {
  const navigator = useNavigation<StackNavigationProp<any>>();

  return (
    <SafeAreaView
      style={{
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
      }}
    >
      {Platform.OS === 'ios' && navigator.canGoBack() && (
        <HeaderBackButton onPress={navigator.goBack} />
      )}
      {Platform.OS !== 'ios' && (
        <DrawerButton
          iconName="menu"
          iconType="MaterialCommunityIcons"
          drawerStyle={{ marginLeft: 10 }}
          navigation={navigation}
        />
      )}
      <HeaderLogo />
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row-reverse',
          marginLeft: 10,
          marginRight: 20,
          marginBottom: 10,
        }}
      >
        {Platform.OS === 'ios' && (
          <DrawerButton
            iconName="dots-vertical"
            iconType="MaterialCommunityIcons"
            drawerStyle={{ marginLeft: 10 }}
            navigation={navigation}
          />
        )}
        <SearchButton navigation={navigation} />
        {showListButtonFromArticleType !== undefined && (
          <ArticleListButton
            articleType={showListButtonFromArticleType}
            articleButtonStyle={{
              marginRight: 20,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
