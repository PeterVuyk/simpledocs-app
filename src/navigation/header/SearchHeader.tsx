import * as React from 'react';
import { Platform, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

interface Props {
  children: React.ReactNode;
  searchText: string;
  handleSearchTextChange: (searchText: string) => void;
}

const SearchHeader: React.FC<Props> = ({
  children,
  searchText,
  handleSearchTextChange,
}) => {
  let searchRef: null | SearchBar = null;

  React.useEffect(() => {
    searchRef?.focus();
  }, [searchRef]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 50,
          height: 125,
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
          backgroundColor: '#fff',
        }}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <SearchBar
            ref={search => {
              searchRef = search;
            }}
            containerStyle={{ backgroundColor: '#fff' }}
            inputContainerStyle={{ backgroundColor: '#fff' }}
            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
            placeholder="Zoek op titel of trefwoord..."
            onChangeText={typedText => handleSearchTextChange(typedText)}
            showCancel
            value={searchText}
          />
        </View>
      </View>
      {children}
    </View>
  );
};

export default SearchHeader;
