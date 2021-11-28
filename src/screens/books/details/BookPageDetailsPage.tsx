import React, { FC, useCallback, useEffect, useRef } from 'react';
import { View, FlatList, ScaledSize } from 'react-native';
import BookPageDetailItem from './BookPageDetailItem';
import { InfoBookPage } from '../../../model/bookPages/InfoBookPage';

interface Props {
  currentChapter: string;
  bookType: string;
  infoBookPages: InfoBookPage[];
  windowWidth: ScaledSize;
  onPageChange: (chapter: string) => void;
}

const BookPageDetailsPage: FC<Props> = ({
  currentChapter,
  infoBookPages,
  bookType,
  windowWidth,
  onPageChange,
}) => {
  const flatListRef = useRef<FlatList<InfoBookPage> | null>(null);

  useEffect(() => {
    const index = infoBookPages
      .map(value => value.chapter)
      .indexOf(currentChapter);
    flatListRef.current?.scrollToIndex({
      animated: false,
      index: index === -1 ? 1 : index,
    });
  }, [infoBookPages, currentChapter]);

  const onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const val = Math.round(contentOffset.x / viewSize.width);
    onPageChange(infoBookPages[val].chapter);
  };

  const renderItem = useCallback(
    (infoBookPage: InfoBookPage) => (
      <View style={{ width: windowWidth.width, flex: 1 }}>
        <BookPageDetailItem
          bookPageChapter={infoBookPage.chapter}
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
        data={infoBookPages}
        initialScrollIndex={infoBookPages
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

export default BookPageDetailsPage;
