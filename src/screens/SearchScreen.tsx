import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import RegulationsRepository from '../database/RegulationsRepository';

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
  const [regulations, setRegulations] = React.useState([]);

  React.useEffect(() => {
    RegulationsRepository.searchRegulations(searchText, setRegulations);
  }, [searchText]);

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <Text>SearchResult</Text>
      <Text>value: {searchText}</Text>
      {regulations && (
        <FlatList
          data={regulations}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      )}
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
