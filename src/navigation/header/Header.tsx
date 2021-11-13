import React, { FC } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { HeaderBackButton, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DrawerButton from './DrawerButton';
import SearchButton from './search/SearchButton';
import BookmarkChapter from './favorites/BookmarkChapter';
import HeaderLogo from './HeaderLogo';
import { ArticleChapter } from '../../model/ArticleChapter';

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
});

interface Props {
  navigation: DrawerNavigationHelpers;
  articleChapter?: ArticleChapter;
}

const Header: FC<Props> = ({ articleChapter, navigation }) => {
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
      <View style={headerStyles.rightContainer}>
        {Platform.OS === 'ios' && (
          <DrawerButton
            iconName="dots-vertical"
            iconType="MaterialCommunityIcons"
            navigation={navigation}
          />
        )}
        <SearchButton navigation={navigation} />
        {/* TODO: Later when we support bookmarks we can enable this part of the code */}
        {/* {false && bookType !== undefined && currentChapter !== undefined && ( */}
        {/*  <BookmarkChapter chapter={currentChapter} bookType={bookType} /> */}
        {/* )} */}
        {articleChapter !== undefined && (
          <BookmarkChapter articleChapter={articleChapter} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
