import * as React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  const navigation = useNavigation<StackNavigationProp<any>>();

  React.useEffect(() => {
    searchRef?.focus();
  }, [searchRef]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 40,
          height: 110,
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
            onChangeText={typedText => handleSearchTextChange(typedText)}
            value={searchText}
          />
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default SearchHeader;
