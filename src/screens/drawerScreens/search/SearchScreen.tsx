import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, Text } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import articleRepository from '../../../database/repository/articleRepository';
import { Article } from '../../../model/articles/Article';
import SearchHeader from '../../../navigation/header/search/SearchHeader';
import KeyboardAwareView from '../../../components/keyboard/KeyboardAwareView';
import { AppConfigurations } from '../../../model/configurations/AppConfigurations';
import SearchScreenNavigator from './SearchScreenNavigator';
import DrawerScreen from '../DrawerScreen';
import SearchResultItem from './SearchResultItem';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  findPlaceholderImage: {
    marginTop: 120,
    height: 120,
    width: 'auto',
    resizeMode: 'contain',
  },
  noResultsTextSize: {
    ...globalStyle.typography.h4,
  },
  noResultContainer: { flex: 1, margin: 20 },
});

interface Props {
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const SearchScreen: FC<Props> = ({ navigation, appConfigurations }) => {
  const [searchItem, setSearchItem] = useState<string>(
    appConfigurations.defaultBookTypeSearch,
  );
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (searchText === '') {
      setArticles(null);
      return;
    }
    if (searchItem === 'favorites') {
      articleRepository.searchArticlesByBookmarks(searchText, setArticles);
      return;
    }
    articleRepository.searchArticlesByBookType(
      searchItem,
      searchText,
      setArticles,
    );
  }, [searchItem, searchText]);

  const handleSearchTextChange = (searchedText: string): void =>
    setSearchText(searchedText);

  const onTabChange = (type: string): void => {
    setArticles(null);
    setSearchItem(type);
  };

  return (
    <DrawerScreen appConfigurations={appConfigurations} navigation={navigation}>
      <SearchHeader
        handleSearchTextChange={handleSearchTextChange}
        searchText={searchText}
      >
        <View>
          <SearchScreenNavigator
            onTabChange={onTabChange}
            chipItem={searchItem}
          />
        </View>
        <KeyboardAwareView>
          {!articles && searchText === '' && (
            <Image
              style={styles.findPlaceholderImage}
              source={require('../../../../assets/images/find.png')}
            />
          )}
          {articles && articles.length === 0 && searchText !== '' && (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultsTextSize}>
                Geen zoekresultaten.{`\n\n`}
                <Text>Suggesties:{`\n`}</Text>
                <Text>
                  - Zorg ervoor dat de zoekopdracht goed gespeld is.{`\n`}
                </Text>
                <Text>- Gebruik andere trefwoorden.{`\n`}</Text>
                <Text>- Zoek in een andere categorie.{`\n`}</Text>
              </Text>
            </View>
          )}
          {articles && (
            <FlatList<Article>
              data={articles}
              keyExtractor={item =>
                item.chapter.toString() + item.bookType.toString()
              }
              renderItem={({ item }) => (
                <SearchResultItem searchText={searchText} article={item} />
              )}
            />
          )}
        </KeyboardAwareView>
      </SearchHeader>
    </DrawerScreen>
  );
};

export default SearchScreen;
