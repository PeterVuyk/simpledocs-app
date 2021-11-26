import React, { FC, useCallback, useEffect, useRef } from 'react';
import { View, FlatList, ScaledSize } from 'react-native';
import ArticleDetailItem from './ArticleDetailItem';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';

interface Props {
  currentChapter: string;
  bookType: string;
  articleChapterList: ArticleChapter[];
  windowWidth: ScaledSize;
  onPageChange: (chapter: string) => void;
}

const ArticleDetailsPage: FC<Props> = ({
  currentChapter,
  articleChapterList,
  bookType,
  windowWidth,
  onPageChange,
}) => {
  const flatListRef = useRef<FlatList<ArticleChapter> | null>(null);

  useEffect(() => {
    const index = articleChapterList
      .map(value => value.chapter)
      .indexOf(currentChapter);
    flatListRef.current?.scrollToIndex({
      animated: false,
      index: index === -1 ? 1 : index,
    });
  }, [articleChapterList, currentChapter]);

  const onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const val = Math.round(contentOffset.x / viewSize.width);
    onPageChange(articleChapterList[val].chapter);
  };

  const renderItem = useCallback(
    (chapter: ArticleChapter) => (
      <View style={{ width: windowWidth.width, flex: 1 }}>
        <ArticleDetailItem
          articleChapter={chapter.chapter}
          bookType={bookType}
        />
      </View>
    ),
    [bookType, windowWidth],
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        style={{ flex: 1 }}
        nestedScrollEnabled
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={1}
        initialNumToRender={3}
        windowSize={3}
        onMomentumScrollEnd={onScrollEnd}
        data={articleChapterList}
        initialScrollIndex={articleChapterList
          .map(value => value.chapter)
          .indexOf(currentChapter)}
        getItemLayout={(data, index) => ({
          length: windowWidth.width,
          offset: windowWidth.width * index,
          index,
        })}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

export default ArticleDetailsPage;
