import * as React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC, ReactNode, useEffect } from 'react';
import SearchTab from '../../screens/search/SearchTab';
import { ArticleType } from '../../model/ArticleType';

interface Props {
  children: ReactNode;
  searchText: string;
  handleSearchTextChange: (searchText: string) => void;
  handleArticleTypeTabChange: (articleType: ArticleType) => void;
}

const SearchHeader: FC<Props> = ({
  children,
  searchText,
  handleSearchTextChange,
  handleArticleTypeTabChange,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 40,
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
          <SearchTab handleArticleTypeTabChange={handleArticleTypeTabChange} />
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default SearchHeader;
