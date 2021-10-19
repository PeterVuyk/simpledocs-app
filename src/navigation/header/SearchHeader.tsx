import React, { FC, ReactNode, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchScreenBookTypeNavigator from '../../screens/search/SearchScreenBookTypeNavigator';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  handleBookTypeTabChange: (bookType: string) => void;
  bookType: string;
}

const SearchHeader: FC<Props> = ({
  children,
  searchText,
  handleSearchTextChange,
  handleBookTypeTabChange,
  bookType,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <View style={styles.container}>
          {isFocused && (
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
          )}
          <SearchScreenBookTypeNavigator
            onBookTypeTabChange={handleBookTypeTabChange}
            bookType={bookType}
          />
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default SearchHeader;
