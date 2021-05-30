import React from 'react';
import { FlatList, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import HighlightWords from '../../components/HighlightWords';
import regulationRepository, {
  Regulation,
} from '../../database/repository/regulationRepository';
import SearchHeader from '../../navigation/header/SearchHeader';
import searching, { SearchText } from '../../redux/actions/searching';
import SVGIcon from '../../components/SVGIcon';
import KeyboardAwareView from '../../components/keyboard/KeyboardAwareView';

interface Props {
  setChapterSearchText: (searchText: SearchText) => void;
}

const SearchScreen: React.FC<Props> = ({ setChapterSearchText }) => {
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
    if (firstOccurrence < 100 && fullBody.length > 100) {
      return `${fullBody.replace('\n', '').substring(0, 100)}...`;
    }
    if (fullBody.length > 200) {
      return `...${fullBody.substring(
        firstOccurrence - 10,
        firstOccurrence + 10,
      )}...`;
    }
    return fullBody;
  };

  const submitSearch = (item: Regulation) => {
    setChapterSearchText({ chapter: item.chapter, searchText });
    navigation.push('RegulationDetailsScreen', {
      regulationChapter: item.chapter,
      searchText: { chapter: item.chapter, searchText },
    });
  };

  const renderItem = (item: Regulation) => (
    <ListItem bottomDivider onPress={() => submitSearch(item)}>
      <SVGIcon iconBlob={item.iconFile} />
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
            textToHighlight={getShortenedBody(item.searchText)}
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
      <KeyboardAwareView>
        {regulations.length === 0 && (
          <Image
            style={{
              marginTop: 120,
              height: 120,
              width: 'auto',
              resizeMode: 'contain',
            }}
            source={require('../../../assets/images/find.png')}
          />
        )}
        {regulations && (
          <FlatList<Regulation>
            data={regulations}
            keyExtractor={item => item.chapter.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
      </KeyboardAwareView>
    </SearchHeader>
  );
};

const mapStateToProps = state => {
  return {
    chapterSearchText: state.searching.chapterSearchText,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChapterSearchText: (searchText: SearchText) =>
      dispatch(searching.setChapterSearchText(searchText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
