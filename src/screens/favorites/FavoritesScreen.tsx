import React, { FC, useCallback, useEffect, useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { Image, SectionList, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import articleRepository from '../../database/repository/articleRepository';
import { ArticleChapter } from '../../model/articles/ArticleChapter';
import ListItem from '../../components/listItem/ListItem';
import configHelper from '../../helper/configHelper';
import TitleBar from '../../components/titleBar/TitleBar';
import useContentNavigator from '../../components/hooks/useContentNavigator';
import SectionTitleBar from '../../components/titleBar/SectionTitleBar';

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#fff',
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
  data: ArticleChapter[];
}
interface Props {
  navigation: DrawerNavigationProp<any>;
}

const FavoritesScreen: FC<Props> = () => {
  const [sections, setSections] = useState<Sections[]>([]);
  const isFocused = useIsFocused();
  const { navigateToChapter } = useContentNavigator();

  const mapSections = useCallback(async (chapters: ArticleChapter[]) => {
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

  useEffect(() => {
    let isMounted = true;
    if (isFocused) {
      articleRepository.getBookmarkedChapters(
        async (chapters: ArticleChapter[]) => {
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
    (item: ArticleChapter) => (
      <ListItem
        title={item.title}
        subTitle={item.subTitle}
        iconFile={item.iconFile}
        bookmarked={false}
        onSubmit={() =>
          navigateToChapter(
            { articleChapter: item.chapter, bookType: item.bookType },
            item.bookType,
          )
        }
      />
    ),
    [navigateToChapter],
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
            source={require('../../../assets/images/bookmark.png')}
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

export default FavoritesScreen;