import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, ScaledSize } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ArticleDetailItem from './ArticleDetailItem';
import { ArticleChapter } from '../../../model/ArticleChapter';
import ShowNotification from '../../../components/ShowNotification';
import { NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP } from '../../../model/NotificationType';
import BookChapterNavigator from '../BookChapterNavigator';

interface Props {
  articleChapter: string;
  bookType: string;
  articleChapterList: ArticleChapter[];
  windowWidth: ScaledSize;
}

const ArticleDetails: FC<Props> = ({
  articleChapter,
  articleChapterList,
  bookType,
  windowWidth,
}) => {
  const flatListRef = useRef<FlatList<ArticleChapter> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const isFocused = useIsFocused();

  const handleArticleNavigation = useCallback(
    (chapter: string) => {
      const index = articleChapterList
        .map(value => value.chapter)
        .indexOf(chapter);
      setCurrentIndex(index === -1 ? 1 : index);
      flatListRef.current?.scrollToIndex({
        animated: false,
        index: index === -1 ? 1 : index,
      });
    },
    [articleChapterList],
  );

  useEffect(() => {
    const index = articleChapterList
      .map(value => value.chapter)
      .indexOf(articleChapter);
    setCurrentIndex(index === -1 ? 1 : index);
  }, [articleChapter, articleChapterList, handleArticleNavigation]);

  const onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    setCurrentIndex(Math.round(contentOffset.x / viewSize.width));
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
      <ShowNotification
        notificationType={NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP}
      />
      {isFocused && currentIndex !== undefined && (
        <>
          <BookChapterNavigator
            onArticleNavigation={handleArticleNavigation}
            articleChapterList={articleChapterList}
            currentChapter={articleChapterList[currentIndex].chapter}
          />
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
            initialScrollIndex={currentIndex}
            getItemLayout={(data, index) => ({
              length: windowWidth.width,
              offset: windowWidth.width * index,
              index,
            })}
            keyExtractor={item => item.chapter.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </>
      )}
    </View>
  );
};

export default ArticleDetails;
