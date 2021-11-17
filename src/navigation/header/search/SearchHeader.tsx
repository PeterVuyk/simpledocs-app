import React, { FC, ReactNode, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
  tabContainer: { flex: 1, backgroundColor: '#fff' },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#fff',
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
    <SafeAreaView style={styles.tabContainer}>
      <View style={styles.searchInputContainer}>
        <View style={styles.tabContainer}>
          <SearchBar
            ref={search => {
              searchRef = search;
            }}
            containerStyle={{ backgroundColor: '#fff' }}
            inputContainerStyle={{
              backgroundColor: Platform.OS === 'ios' ? '#ddd' : '#fff',
            }}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            placeholder="Zoek op titel of trefwoord..."
            onCancel={() => (Platform.OS === 'ios' ? navigation.pop() : '')}
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