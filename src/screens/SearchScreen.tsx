import React from 'react';
import { View, Keyboard, FlatList, ImageBackground } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import HighlightWords from '../components/HighlightWords';
import getChapterIcon from '../helper/getChapterIcon';
import regulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';

interface Props {
  searchText: string;
}

const SearchScreen: React.FC<Props> = ({ searchText }) => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);

  React.useEffect(() => {
    if (searchText === '') {
      setRegulations([]);
      return;
    }
    regulationRepository.searchRegulations(searchText, setRegulations);
  }, [searchText]);

  const navigation = useNavigation();

  const getShortenedBody = (fullBody: string): string => {
    const firstOccurrence: number = fullBody.indexOf(searchText);
    if (firstOccurrence < 50 && fullBody.length > 100) {
      return `${fullBody.substr(0, 100)}...`;
    }
    if (fullBody.length > 100) {
      return `...${fullBody.substr(
        firstOccurrence - 50,
        firstOccurrence + 50,
      )}...`;
    }
    return fullBody;
  };

  const renderItem = (item: Regulation) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('RegulationDetailsScreen', {
          regulationChapter: item.chapter,
          searchText,
        })
      }
    >
      <Avatar
        source={{
          uri: Asset.fromModule(getChapterIcon(item.chapter)).uri,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>
          <HighlightWords
            searchText={searchText}
            textToHighlight={item.title}
          />
        </ListItem.Title>
        <ListItem.Subtitle>
          <HighlightWords
            searchText={searchText}
            textToHighlight={getShortenedBody(item.search_text)}
          />
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{ flex: 1 }} onTouchStart={Keyboard.dismiss}>
      {regulations.length === 0 && (
        <ImageBackground
          style={{
            flex: 1,
            marginTop: 120,
            height: 120,
          }}
          source={require('../../assets/images/find.png')}
          resizeMode="center"
        />
      )}
      {regulations && (
        <FlatList<Regulation>
          data={regulations}
          keyExtractor={item => item.chapter.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default SearchScreen;
