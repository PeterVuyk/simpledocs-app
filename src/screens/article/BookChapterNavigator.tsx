import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chip, ThemeProvider } from 'react-native-elements';
import { ArticleChapter } from '../../model/ArticleChapter';

interface Props {
  onArticleNavigation: (chapter: string) => void;
  currentChapter: string;
  articleChapterList: ArticleChapter[];
}

const styles = StyleSheet.create({
  navigationBorder: {
    borderBottomColor: '#d4d3d3',
    borderBottomWidth: 1,
  },
  navigationContainer: {
    paddingBottom: 5,
    marginBottom: 0,
    marginTop: 5,
  },
});

const theme = {
  Chip: {
    theme: { colors: { primary: '#154594' } },
  },
};

const BookChapterNavigator: FC<Props> = ({
  onArticleNavigation,
  currentChapter,
  articleChapterList,
}) => {
  const flatListRef = useRef<FlatList<ArticleChapter> | null>(null);

  const ITEM_LENGTH = useMemo(() => {
    const maxCharacters = Math.max(
      ...articleChapterList.map(value => value.chapter.length),
    );
    return maxCharacters < 6 ? (maxCharacters + 3) * 11 : maxCharacters * 11;
  }, [articleChapterList]);

  const firstUpdate = useRef(true);
  /**
   * The useEffect to scrollToIndex should only be triggered if the chapter changes,
   * and not on the initial load, otherwise it conflicts with FlatLists 'initialScrollIndex'.
   */
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const index = articleChapterList
      .map(chapter => chapter.chapter)
      .indexOf(currentChapter);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index === -1 ? 1 : index,
    });
  }, [articleChapterList, currentChapter]);

  const renderItem = useCallback(
    (item: ArticleChapter) => {
      const isSelected = item.chapter === currentChapter;
      return (
        <View key={item.chapter} style={{ padding: 2 }}>
          <Chip
            title={item.chapter}
            titleStyle={[isSelected ? { color: '#fff' } : { color: '#154594' }]}
            type={isSelected ? 'solid' : 'outline'}
            onPress={() => onArticleNavigation(item.chapter)}
            buttonStyle={{ width: ITEM_LENGTH }}
          />
        </View>
      );
    },
    [ITEM_LENGTH, currentChapter, onArticleNavigation],
  );

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <FlatList
        style={[styles.navigationContainer, styles.navigationBorder]}
        ref={flatListRef}
        keyExtractor={item => item.chapter.toString()}
        initialScrollIndex={articleChapterList
          .map(chapter => chapter.chapter)
          .indexOf(currentChapter)}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={articleChapterList}
        getItemLayout={(data, index) => {
          return {
            length: ITEM_LENGTH + 4,
            // offset is width item times the index, then we want to show the previous chapter also in the list. Finally we add the padding around the Chips
            offset: ITEM_LENGTH * index - ITEM_LENGTH + index * 4 - 2,
            index,
          };
        }}
        renderItem={({ item }) => (
          <ThemeProvider theme={theme}>{renderItem(item)}</ThemeProvider>
        )}
      />
    </View>
  );
};

export default BookChapterNavigator;
