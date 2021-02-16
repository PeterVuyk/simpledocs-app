import React from 'react';
import {StyleSheet, Text, View, Image, Keyboard} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  searchText: string;
}

const SearchScreen: React.FC<Props> = ({ searchText }) => {
  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <Text>SearchResult</Text>
      <Text>value: {searchText}</Text>
      <Image
        /* eslint-disable-next-line global-require */
        source={require('../../assets/images/background.png')}
        style={{ position: 'absolute', resizeMode: 'contain', opacity: 0.4 }}
        blurRadius={4}
      />
    </View>
  );
};

export default SearchScreen;
