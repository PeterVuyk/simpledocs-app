import { SearchBar } from 'react-native-elements';
import React from 'react';
import { Platform, View } from 'react-native';

interface Props {
  handleSearchIsTypingChange: (isTyping: boolean) => void;
  handleSearchIsActiveChange: (isActive: boolean) => void;
}

const AppSearchBar: React.FC<Props> = ({
  handleSearchIsTypingChange,
  handleSearchIsActiveChange,
}) => {
  const [search, setSearch] = React.useState('');

  const setSearchIsTyping = (text: string) => {
    if (text === '') {
      handleSearchIsTypingChange(false);
    } else {
      handleSearchIsTypingChange(true);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <SearchBar
        containerStyle={{ backgroundColor: '#fff', marginTop: 55, padding: 5 }}
        inputContainerStyle={{ backgroundColor: '#fff' }}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        placeholder="Zoek op titel of trefwoord..."
        onChangeText={text => {
          setSearch(text);
          setSearchIsTyping(text);
        }}
        value={search}
        onCancel={() => {
          handleSearchIsActiveChange(false);
        }}
      />
    </View>
  );
};

export default AppSearchBar;
