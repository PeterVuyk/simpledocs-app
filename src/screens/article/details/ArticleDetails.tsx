import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, ScaledSize } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ArticleDetailItem from './ArticleDetailItem';
import { ArticleChapter } from '../../../model/articles/ArticleChapter';
import { NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP } from '../../../model/notifications/NotificationType';
import BookChapterNavigator from '../BookChapterNavigator';
import useNotification from '../../../components/notification/useNotification';
import BookmarkToggle from '../../bookmarks/BookmarkToggle';

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
  const { notify } = useNotification();
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
    let isMounted = true;
    if (isMounted) {
      notify(NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP);
    }
    return () => {
      isMounted = false;
    };
  }, [notify]);

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
      {isFocused && currentIndex !== undefined && (
        <>
          <BookmarkToggle articleChapter={articleChapterList[currentIndex]} />
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
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </>
      )}
    </View>
  );
};

export default ArticleDetails;
