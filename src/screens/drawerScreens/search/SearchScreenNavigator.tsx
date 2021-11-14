import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import getWidth from 'string-pixel-width';
import configHelper from '../../../helper/configHelper';
import { BookInfo } from '../../../model/configurations/AppConfigurations';
import NavigatorChip from '../../../components/NavigatorChip';

interface SearchItem {
  index: number;
  width: number;
  title: string;
  item: string;
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
  onTabChange: (chipItem: string) => void;
  chipItem: string;
}

const SearchScreenNavigator: FC<Props> = ({ onTabChange, chipItem }) => {
  const [searchItems, setSearchItems] = useState<SearchItem[]>([]);
  const flatListRef = useRef<FlatList<SearchItem> | null>(null);
  const isFocused = useIsFocused();

  const getChipWidth = (text: string) => {
    const width = getWidth(text.toUpperCase(), {
      bold: true,
      size: 14,
    });
    return width < 160 ? width + 35 : 200;
  };

  const mapSearchItems = useCallback((books: BookInfo[]) => {
    let index = 1;
    const result = books.map(value => {
      return {
        item: value.bookType,
        title: value.title,
        width: getChipWidth(value.title),
        index: index++,
      } as SearchItem;
    });
    result.push({
      item: 'favorites',
      title: 'Favorieten',
      width: getChipWidth('Favorieten'),
      index: 0,
    });
    return result.sort((a, b) => a.index - b.index);
  }, []);

  useEffect(() => {
    const index = searchItems.find(value => value.item === chipItem)?.index;
    if (index === undefined) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
    });
    // added 'isFocused' so we scroll back to the focused Chip
  }, [isFocused, chipItem, searchItems]);

  useEffect(() => {
    configHelper
      .getBookTypes()
      .then(value => mapSearchItems(value))
      .then(value => setSearchItems(value));
  }, [mapSearchItems]);

  const getItem = (searchItem: SearchItem) => {
    return (
      <NavigatorChip
        id={searchItem.item}
        title={searchItem.title}
        isSelected={searchItem.item === chipItem}
        onPress={title => {
          if (title === chipItem) {
            return;
          }
          onTabChange(title);
        }}
        width={searchItem.width}
      />
    );
  };

  const getIndexItem = (index: number) => {
    let width = 0;
    for (const item of searchItems) {
      if (item.index === index) {
        return width;
      }
      width += item.width;
    }
    return width;
  };

  return (
    <>
      {searchItems.length !== 0 && (
        <FlatList
          ref={flatListRef}
          style={[styles.navigationContainer, styles.navigationBorder]}
          keyExtractor={item => item.title.toString()}
          data={searchItems}
          horizontal
          initialScrollIndex={
            searchItems.find(value => value.item === chipItem)?.index ?? 0
          }
          getItemLayout={(data, index) => {
            const width = getIndexItem(index);
            return {
              length:
                searchItems.find(value => value.index === index)?.width ?? 0,
              offset: width + index * 4 - 40,
              index,
            };
          }}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => getItem(item)}
        />
      )}
    </>
  );
};

export default SearchScreenNavigator;
