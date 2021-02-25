import { SearchBar } from 'react-native-elements';
import React from 'react';
import { Platform, View } from 'react-native';

interface Props {
  handleSearchTextChange: (searchText: string) => void;
  searchText: string;
}

const AppSearchBar: React.FC<Props> = ({
  handleSearchTextChange,
  searchText,
}) => {
  let searchRef: null | SearchBar = null;

  React.useEffect(() => {
    searchRef?.focus();
  }, [searchRef]);

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <SearchBar
        ref={search => {
          searchRef = search;
        }}
        containerStyle={{ backgroundColor: '#fff', marginTop: 55, padding: 5 }}
        inputContainerStyle={{ backgroundColor: '#fff' }}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        placeholder="Zoek op titel of trefwoord..."
        onChangeText={typedText => handleSearchTextChange(typedText)}
        value={searchText}
      />
    </View>
  );
};

export default AppSearchBar;
