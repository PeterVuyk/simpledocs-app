import React, { FC, useCallback, useEffect, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ArticleDetailItem from './ArticleDetailItem';
import { ArticleChapter } from '../../../model/ArticleChapter';
import ShowNotification from '../../../components/ShowNotification';
import { NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP } from '../../../model/NotificationType';

interface Props {
  articleChapter: string;
  bookType: string;
  articleChapterList: ArticleChapter[];
}

const ArticleDetails: FC<Props> = ({
  articleChapter,
  articleChapterList,
  bookType,
}) => {
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState<number>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const index = articleChapterList
      .map(chapter => chapter.chapter)
      .indexOf(articleChapter);
    setCurrentIndex(index === -1 ? 1 : index);
  }, [articleChapter, articleChapterList]);

  const onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    setCurrentIndex(Math.round(contentOffset.x / viewSize.width));
  };

  const renderItem = useCallback(
    (chapter: ArticleChapter) => (
      <View style={{ width, flex: 1 }}>
        <ArticleDetailItem
          articleChapter={chapter.chapter}
          bookType={bookType}
        />
      </View>
    ),
    [bookType, width],
  );

  return (
    <View style={{ flex: 1 }}>
      <ShowNotification
        notificationType={NOTIFICATION_TYPE_HORIZONTAL_SCROLL_TIP}
      />
      {isFocused && currentIndex !== undefined && (
        <FlatList
          style={{ flex: 1 }}
          nestedScrollEnabled
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
          onMomentumScrollEnd={onScrollEnd}
          windowSize={3}
          data={articleChapterList}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          keyExtractor={item => item.chapter.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default ArticleDetails;
