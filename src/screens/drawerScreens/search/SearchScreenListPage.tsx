import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { SearchTab } from '../../../model/SearchTab';
import articleRepository from '../../../database/repository/articleRepository';
import { Article } from '../../../model/articles/Article';
import SearchScreenListPageItem from './SearchScreenListPageItem';
import NoSearchResultView from './NoSearchResultView';
import IntentSearchScreenListPage from './IntentSearchScreenListPage';

const styles = StyleSheet.create({
  findPlaceholderImage: {
    marginTop: 120,
    height: 120,
    width: 'auto',
    resizeMode: 'contain',
  },
});

interface Props {
  searchTab: SearchTab;
  searchText: string;
}

const SearchScreenListPage: FC<Props> = ({ searchText, searchTab }) => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const searchDatabaseOnSearchText = () => {
      if (searchText === '') {
        setArticles(null);
        return;
      }
      if (text === searchText) {
        return;
      }
      if (searchTab.itemId === 'bookmarks') {
        articleRepository.searchArticlesByBookmarks(searchText, value => {
          if (isMounted) {
            setText(searchText);
            setArticles(value);
          }
        });
        return;
      }
      articleRepository.searchArticlesByBookType(
        searchTab.itemId,
        searchText,
        value => {
          if (isMounted) {
            setText(searchText);
            setArticles(value);
          }
        },
      );
    };
    searchDatabaseOnSearchText();
    return () => {
      isMounted = false;
    };
  }, [searchTab.itemId, searchText, text]);

  if (!articles && searchText === '') {
    return (
      <Image
        style={styles.findPlaceholderImage}
        source={require('../../../../assets/images/find.png')}
      />
    );
  }

  if (articles && articles.length === 0 && searchText !== '') {
    return <NoSearchResultView />;
  }

  if (articles) {
    return (
      <FlatList<Article>
        data={articles}
        keyExtractor={item =>
          item.chapter.toString() + item.bookType.toString()
        }
        renderItem={({ item }) => (
          <SearchScreenListPageItem searchText={searchText} article={item} />
        )}
      />
    );
  }

  return <IntentSearchScreenListPage />;
};

export default SearchScreenListPage;
