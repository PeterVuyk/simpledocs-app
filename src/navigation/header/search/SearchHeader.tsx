import React, { FC, ReactNode, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WhitePortal } from 'react-native-portal';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 80,
  },
  searchBar: {
    borderWidth: 0,
    backgroundColor: globalStyle.color.white,
    height: 60,
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
    <>
      <SafeAreaView style={styles.headerContainer}>
        <WhitePortal name="goBackButton" />
        <View style={{ flex: 1 }}>
          <SearchBar
            ref={search => {
              searchRef = search;
            }}
            containerStyle={styles.searchBar}
            inputContainerStyle={{
              backgroundColor:
                Platform.OS === 'ios'
                  ? globalStyle.color.default.light
                  : globalStyle.color.white,
            }}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            placeholder="Zoek op trefwoord..."
            onCancel={() => (Platform.OS === 'ios' ? navigation.goBack() : '')}
            onChangeText={handleSearchTextChange}
            value={searchText}
          />
        </View>
      </SafeAreaView>
      {children}
    </>
  );
};

export default SearchHeader;
