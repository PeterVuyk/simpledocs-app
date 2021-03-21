import React from 'react';
import { View, Keyboard, FlatList, ImageBackground } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import HighlightWords from '../components/HighlightWords';
import regulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';
import SearchHeader from '../navigation/header/SearchHeader';

const SearchScreen: React.FC = () => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');

  React.useEffect(() => {
    if (searchText === '') {
      setRegulations([]);
      return;
    }
    regulationRepository.searchRegulations(searchText, setRegulations);
  }, [searchText]);

  const handleSearchTextChange = (searchedText: string): void =>
    setSearchText(searchedText);

  const navigation = useNavigation<StackNavigationProp<any>>();

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
        navigation.push('RegulationDetailsScreen', {
          regulationChapter: item.chapter,
          searchText: { chapter: item.chapter, searchText },
        })
      }
    >
      <Avatar
        source={{
          uri: `data:image/png;base64,${item.icon}`,
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
    <SearchHeader
      handleSearchTextChange={handleSearchTextChange}
      searchText={searchText}
    >
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
    </SearchHeader>
  );
};

export default SearchScreen;
