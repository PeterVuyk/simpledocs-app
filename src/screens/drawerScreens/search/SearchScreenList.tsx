import React, { FC, useCallback, useEffect, useRef } from 'react';
import { FlatList, ScaledSize, View } from 'react-native';
import { SearchTab } from '../../../model/SearchTab';
import SearchScreenListPage from './SearchScreenListPage';

interface Props {
  window: ScaledSize;
  searchTabs: SearchTab[];
  currentTab: SearchTab;
  searchText: string;
  onTabChange: (searchTab: SearchTab) => void;
}

const SearchScreenList: FC<Props> = ({
  window,
  searchTabs,
  currentTab,
  searchText,
  onTabChange,
}) => {
  const flatListRef = useRef<FlatList<SearchTab> | null>(null);

  const onScrollEnd = e => {
    const { contentOffset } = e.nativeEvent;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const val = Math.round(contentOffset.x / viewSize.width);
    onTabChange(searchTabs[val]);
  };

  const renderItem = useCallback(
    (item: SearchTab) => {
      return (
        <View style={{ width: window.width, flex: 1 }}>
          <SearchScreenListPage searchTab={item} searchText={searchText} />
        </View>
      );
    },
    [searchText, window.width],
  );

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      animated: false,
      index: currentTab.index === -1 ? 1 : currentTab.index,
    });
  }, [currentTab.index, searchTabs]);

  return (
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
      data={searchTabs}
      initialScrollIndex={
        searchTabs.find(value => value.itemId === currentTab.itemId)?.index ?? 0
      }
      getItemLayout={(data, index) => ({
        length: window.width,
        offset: window.width * index,
        index,
      })}
      keyExtractor={item => item.itemId?.toString() ?? ''}
      renderItem={({ item }) => renderItem(item)}
    />
  );
};

export default SearchScreenList;
