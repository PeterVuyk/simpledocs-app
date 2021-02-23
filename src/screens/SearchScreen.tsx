import React from 'react';
import { View, Keyboard, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import RegulationsRepository from '../database/RegulationsRepository';
import HighlightWords from '../components/HighlightWords';
import getChapterIcon from '../helper/getChapterIcon';

interface Props {
  searchText: string;
}

interface RegulationsContent {
  id: number;
  index: number;
  chapter: string;
  // eslint-disable-next-line camelcase
  icon_path: string;
  title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
}

const SearchScreen: React.FC<Props> = ({ searchText }) => {
  const [regulations, setRegulations] = React.useState<RegulationsContent[]>(
    [],
  );

  React.useEffect(() => {
    RegulationsRepository.searchRegulations(searchText, setRegulations);
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

  const renderItem = (item: RegulationsContent) => (
    <ListItem
      bottomDivider
      onPress={event =>
        navigation.navigate('DocumentationView', {
          regulationsContent: item,
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
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={{ flex: 1 }} onTouchStart={Keyboard.dismiss}>
      {regulations && (
        <FlatList<RegulationsContent>
          data={regulations}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default SearchScreen;
