import React, { FC, useCallback, useEffect, useState } from 'react';
import { Image, SectionList, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import bookPagesRepository from '../../database/repository/bookPagesRepository';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import ListItem from '../../components/listItem/ListItem';
import configHelper from '../../helper/configHelper';
import TitleBar from '../../components/titleBar/TitleBar';
import useContentNavigator from '../../components/hooks/useContentNavigator';
import SectionTitleBar from '../../components/titleBar/SectionTitleBar';
import globalStyle from '../../styling/globalStyle';
import SwipeableToggleBookmark from '../../components/bookmarks/SwipeableToggleBookmark';

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: globalStyle.color.white,
    marginBottom: 60,
    flex: 1,
  },
  findPlaceholderImage: {
    marginTop: 120,
    height: 120,
    width: 'auto',
    resizeMode: 'contain',
  },
});

interface Sections {
  bookTitle: string;
  bookType: string;
  data: InfoBookPage[];
}

const BookmarkScreen: FC = () => {
  const [sections, setSections] = useState<Sections[]>([]);
  const isFocused = useIsFocused();
  const { navigateToChapter } = useContentNavigator();

  const mapSections = useCallback(async (chapters: InfoBookPage[]) => {
    const bookTypes = await configHelper.getBookTypes();
    const mappedSections = bookTypes
      .map(bookType => {
        return {
          bookTitle: bookType.title,
          bookType: bookType.bookType,
          data: chapters.filter(value => value.bookType === bookType.bookType),
        };
      })
      .filter(value => value.data.length !== 0);
    setSections(mappedSections);
  }, []);

  const loadBookmarks = useCallback(() => {
    bookPagesRepository.getBookmarkedChapters(mapSections);
  }, [mapSections]);

  useEffect(() => {
    let isMounted = true;
    if (isFocused) {
      bookPagesRepository.getBookmarkedChapters(
        async (chapters: InfoBookPage[]) => {
          if (isMounted) {
            mapSections(chapters);
          }
        },
      );
    }
    return () => {
      isMounted = false;
    };
    // Add 'isFocused' so if you go back you make sure new bookmarks are loaded as well
  }, [isFocused, mapSections]);

  const renderItem = useCallback(
    (item: InfoBookPage) => (
      <SwipeableToggleBookmark infoBookPage={item} onToggle={loadBookmarks}>
        <ListItem
          title={item.title}
          subTitle={item.subTitle}
          iconFile={item.iconFile}
          bookmarked={false}
          onSubmit={() =>
            navigateToChapter(
              { bookPageChapter: item.chapter, bookType: item.bookType },
              item.bookType,
            )
          }
        />
      </SwipeableToggleBookmark>
    ),
    [loadBookmarks, navigateToChapter],
  );

  const getHeader = () => {
    return <TitleBar title="Favorieten" />;
  };

  return (
    <View style={styles.tabContainer}>
      {sections.length === 0 && (
        <>
          <Image
            style={styles.findPlaceholderImage}
            source={require('../../../assets/bookmark.png')}
          />
          <TitleBar title="Favorieten" subTitle="Geen favorieten toegevoegd" />
        </>
      )}
      {sections.length !== 0 && (
        <SectionList
          ListHeaderComponent={getHeader}
          sections={sections}
          renderSectionHeader={({ section: { bookTitle } }) => (
            <SectionTitleBar title={bookTitle} />
          )}
          keyExtractor={({ bookType, chapter }) =>
            chapter.toString() + bookType.toString()
          }
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default BookmarkScreen;
