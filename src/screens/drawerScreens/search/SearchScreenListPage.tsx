import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { SearchTab } from '../../../model/SearchTab';
import bookPagesRepository from '../../../database/repository/bookPagesRepository';
import SearchScreenListPageItem from './SearchScreenListPageItem';
import NoSearchResultView from './NoSearchResultView';
import { BookPage } from '../../../model/bookPages/BookPage';
import IntentShortList from '../../../components/intent/IntentShortList';

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
  const [pages, setPages] = useState<BookPage[] | null>(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const searchDatabaseOnSearchText = () => {
      if (searchText === '') {
        setPages(null);
        return;
      }
      if (text === searchText) {
        return;
      }
      if (searchTab.itemId === 'bookmarks') {
        bookPagesRepository.searchPagesByBookmarks(searchText, value => {
          if (isMounted) {
            setText(searchText);
            setPages(value);
          }
        });
        return;
      }
      bookPagesRepository.searchBookPagesByBookType(
        searchTab.itemId,
        searchText,
        value => {
          if (isMounted) {
            setText(searchText);
            setPages(value);
          }
        },
      );
    };
    searchDatabaseOnSearchText();
    return () => {
      isMounted = false;
    };
  }, [searchTab.itemId, searchText, text]);

  if (!pages && searchText === '') {
    return (
      <Image
        style={styles.findPlaceholderImage}
        source={require('../../../../assets/find.png')}
      />
    );
  }

  if (pages && pages.length === 0 && searchText !== '') {
    return <NoSearchResultView />;
  }

  if (pages) {
    return (
      <FlatList
        data={pages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <SearchScreenListPageItem searchText={searchText} bookPage={item} />
        )}
      />
    );
  }

  return <IntentShortList />;
};

export default SearchScreenListPage;
