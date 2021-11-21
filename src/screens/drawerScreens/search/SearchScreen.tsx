import React, { FC, useCallback, useEffect, useState } from 'react';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { View } from 'react-native';
import getWidth from 'string-pixel-width';
import DimensionsProvider from '../../../components/viewer/DimensionsProvider';
import {
  AppConfigurations,
  BookInfo,
} from '../../../model/configurations/AppConfigurations';
import configHelper from '../../../helper/configHelper';
import SearchScreenNavigator from './SearchScreenNavigator';
import DrawerScreen from '../DrawerScreen';
import SearchHeader from '../../../navigation/header/search/SearchHeader';
import KeyboardAwareView from '../../../components/keyboard/KeyboardAwareView';
import { SearchTab } from '../../../model/SearchTab';
import SearchScreenList from './SearchScreenList';

interface Props {
  navigation: DrawerNavigationHelpers;
  appConfigurations: AppConfigurations;
}

const SearchScreen: FC<Props> = ({ navigation, appConfigurations }) => {
  const [searchTabs, setSearchTabs] = useState<SearchTab[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [searchText, setSearchText] = useState<string>('');

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
        itemId: value.bookType,
        title: value.title,
        chipWidth: getChipWidth(value.title),
        index: index++,
      } as SearchTab;
    });
    result.push({
      itemId: 'bookmarks',
      title: 'Favorieten',
      chipWidth: getChipWidth('Favorieten'),
      index: 0,
    });
    return result.sort((a, b) => a.index - b.index);
  }, []);

  useEffect(() => {
    configHelper
      .getBookTypes()
      .then(value => mapSearchItems(value))
      .then(tabs => {
        const { defaultSearchChip } = appConfigurations;
        if (defaultSearchChip === undefined) {
          setCurrentIndex(0);
          setSearchTabs(tabs);
          return;
        }
        setCurrentIndex(
          tabs.map(value => value.itemId).indexOf(defaultSearchChip) ?? 0,
        );
        setSearchTabs(tabs);
      });
  }, [appConfigurations, appConfigurations.defaultSearchChip, mapSearchItems]);

  const handleTabChange = (searchTab: SearchTab): void => {
    setCurrentIndex(searchTab.index);
  };

  const getCurrentTab = () => {
    return searchTabs !== null ? searchTabs[currentIndex ?? 0] : null;
  };

  return (
    <DrawerScreen appConfigurations={appConfigurations} navigation={navigation}>
      <SearchHeader
        handleSearchTextChange={setSearchText}
        searchText={searchText}
      >
        <View>
          {searchTabs && getCurrentTab() !== null && (
            <SearchScreenNavigator
              searchTabs={searchTabs}
              onTabChange={handleTabChange}
              currentTab={getCurrentTab()!}
            />
          )}
        </View>
        <KeyboardAwareView>
          {searchTabs && getCurrentTab() !== null && (
            <DimensionsProvider
              children={window => (
                <SearchScreenList
                  searchText={searchText}
                  searchTabs={searchTabs}
                  onTabChange={handleTabChange}
                  currentTab={getCurrentTab()!}
                  window={window}
                />
              )}
            />
          )}
        </KeyboardAwareView>
      </SearchHeader>
    </DrawerScreen>
  );
};

export default SearchScreen;
