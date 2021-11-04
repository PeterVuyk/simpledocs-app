import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import getWidth from 'string-pixel-width';
import configHelper from '../../../helper/configHelper';
import { BookInfo } from '../../../model/AppConfigurations';
import NavigatorChip from '../../../components/NavigatorChip';

interface BookInfoItem {
  index: number;
  width: number;
  title: string;
  bookType: string;
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

interface Props {
  onBookTypeTabChange: (bookType: string) => void;
  bookType: string;
}

const SearchScreenBookTypeNavigator: FC<Props> = ({
  onBookTypeTabChange,
  bookType,
}) => {
  const [bookInfoItems, setBookInfoItems] = useState<BookInfoItem[]>([]);
  const flatListRef = useRef<FlatList<BookInfoItem> | null>(null);
  const isFocused = useIsFocused();

  const mapBookInfoToItem = useCallback((books: BookInfo[]) => {
    let index = 0;
    return books.map(value => {
      const width = getWidth(value.title, { bold: true, size: 14 });
      return {
        bookType: value.bookType,
        title: value.title,
        width: width + 35,
        index: index++,
      } as BookInfoItem;
    });
  }, []);

  useEffect(() => {
    const index = bookInfoItems.find(
      value => value.bookType === bookType,
    )?.index;
    if (!index) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
    });
    // added 'isFocused' so we scroll back to the focused Chip
  }, [isFocused, bookType, bookInfoItems]);

  useEffect(() => {
    configHelper
      .getBookTypes()
      .then(value => mapBookInfoToItem(value))
      .then(value => setBookInfoItems(value));
  }, [mapBookInfoToItem]);

  const getItem = (bookInfo: BookInfoItem) => {
    return (
      <NavigatorChip
        id={bookInfo.bookType}
        title={bookInfo.title}
        isSelected={bookInfo.bookType === bookType}
        onPress={onBookTypeTabChange}
        width={bookInfo.width}
      />
    );
  };

  const getIndexItem = (index: number) => {
    let width = 0;
    for (const bookType1 of bookInfoItems) {
      if (bookType1.index === index) {
        return width;
      }
      width += bookType1.width;
    }
    return width;
  };

  return (
    <FlatList
      ref={flatListRef}
      style={[styles.navigationContainer, styles.navigationBorder]}
      keyExtractor={item => item.title.toString()}
      data={bookInfoItems}
      horizontal
      initialScrollIndex={
        bookInfoItems.find(value => value.bookType === bookType)?.index ?? 0
      }
      getItemLayout={(data, index) => {
        const width = getIndexItem(index);
        return {
          length:
            bookInfoItems.find(value => value.index === index)?.width ?? 0,
          offset: width + index * 4,
          index,
        };
      }}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => getItem(item)}
    />
  );
};

export default SearchScreenBookTypeNavigator;
