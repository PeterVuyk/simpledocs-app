import React, { FC, ReactNode, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  headerContainer: { flex: 1, backgroundColor: globalStyle.color.white },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: globalStyle.header.backgroundColor,
    alignItems: 'center',
  },
});

interface Props {
  children: ReactNode;
  searchText: string;
  handleSearchTextChange: (searchText: string) => void;
}

const SearchHeader: FC<Props> = ({
  children,
  searchText,
  handleSearchTextChange,
}) => {
  let searchRef: null | SearchBar = null;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    searchRef?.focus();
  }, [isFocused, searchRef]);

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.searchInputContainer}>
        <View style={{ flex: 1 }}>
          <SearchBar
            ref={search => {
              searchRef = search;
            }}
            containerStyle={{ backgroundColor: globalStyle.color.white }}
            inputContainerStyle={{
              backgroundColor:
                Platform.OS === 'ios'
                  ? globalStyle.color.default.light
                  : globalStyle.color.white,
            }}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            placeholder="Zoek op titel of trefwoord..."
            onCancel={() => (Platform.OS === 'ios' ? navigation.goBack() : '')}
            onChangeText={handleSearchTextChange}
            value={searchText}
          />
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default SearchHeader;
