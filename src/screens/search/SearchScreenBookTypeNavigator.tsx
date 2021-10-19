import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Chip, ThemeProvider } from 'react-native-elements';
import { FlatList, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import configHelper from '../../helper/configHelper';
import { BookInfo } from '../../model/AppConfigurations';

interface BookInfoItem {
  index: number;
  width: number;
  title: string;
  bookType: string;
}

const theme = {
  Chip: {
    theme: { colors: { primary: '#154594' } },
  },
};

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
      let width = 0;
      if (value.title.length < 6) {
        width = (value.title.length + 3) * 11;
      } else if (value.title.length < 12) {
        width = value.title.length * 11;
      } else {
        width = value.title.length * 9;
      }
      return {
        bookType: value.bookType,
        title: value.title,
        width,
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
    const isSelected = bookInfo.bookType === bookType;
    return (
      <View style={{ padding: 2 }}>
        <Chip
          title={bookInfo.title}
          titleStyle={[isSelected ? { color: '#fff' } : { color: '#154594' }]}
          type={isSelected ? 'solid' : 'outline'}
          onPress={() => onBookTypeTabChange(bookInfo.bookType)}
          buttonStyle={{ width: bookInfo.width }}
        />
      </View>
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
          offset: width,
          index,
        };
      }}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <ThemeProvider theme={theme}>{getItem(item)}</ThemeProvider>
      )}
    />
  );
};

export default SearchScreenBookTypeNavigator;
