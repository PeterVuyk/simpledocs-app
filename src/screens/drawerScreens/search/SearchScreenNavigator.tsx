import React, { FC, useEffect, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import NavigatorChip from '../../../components/NavigatorChip';
import globalStyle from '../../../styling/globalStyle';
import { SearchTab } from '../../../model/SearchTab';

const styles = StyleSheet.create({
  navigationBorder: {
    borderBottomColor: globalStyle.color.default.light,
    borderBottomWidth: 1,
  },
  navigationContainer: {
    paddingBottom: 5,
    marginBottom: 0,
    marginTop: 5,
  },
});

interface Props {
  onTabChange: (searchTab: SearchTab) => void;
  searchTabs: SearchTab[];
  currentTab: SearchTab;
}

const SearchScreenNavigator: FC<Props> = ({
  onTabChange,
  currentTab,
  searchTabs,
}) => {
  const flatListRef = useRef<FlatList<SearchTab> | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const index = searchTabs.find(
      value => value.itemId === currentTab.itemId,
    )?.index;
    if (index === undefined) {
      return;
    }
    flatListRef.current?.scrollToIndex({
      animated: true,
      index,
    });
    // added 'isFocused' so we scroll back to the focused Chip
  }, [isFocused, searchTabs, currentTab]);

  const getItem = (searchTab: SearchTab) => {
    return (
      <NavigatorChip
        id={searchTab.itemId}
        title={searchTab.title}
        isSelected={searchTab.itemId === currentTab.itemId}
        onPress={title => {
          if (title === currentTab.itemId) {
            return;
          }
          onTabChange(searchTab);
        }}
        width={searchTab.chipWidth}
      />
    );
  };

  const getIndexItem = (index: number) => {
    let width = 0;
    for (const item of searchTabs) {
      if (item.index === index) {
        return width;
      }
      width += item.chipWidth;
    }
    return width;
  };

  return (
    <FlatList
      ref={flatListRef}
      style={[styles.navigationContainer, styles.navigationBorder]}
      keyExtractor={item => item.title.toString()}
      data={searchTabs}
      horizontal
      initialScrollIndex={
        searchTabs.find(value => value.itemId === currentTab.itemId)?.index ?? 0
      }
      getItemLayout={(data, index) => {
        const width = getIndexItem(index);
        return {
          length:
            searchTabs.find(value => value.index === index)?.chipWidth ?? 0,
          offset: width + index * 4 - 40,
          index,
        };
      }}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => getItem(item)}
    />
  );
};

export default SearchScreenNavigator;
