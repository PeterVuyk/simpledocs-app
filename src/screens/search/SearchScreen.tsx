import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import articleRepository from '../../database/repository/articleRepository';
import { Article } from '../../model/Article';
import searching, { SearchText } from '../../redux/actions/searching';
import SVGIcon from '../../components/SVGIcon';
import HighlightWords from '../../components/HighlightWords';
import SearchHeader from '../../navigation/header/SearchHeader';
import KeyboardAwareView from '../../components/keyboard/KeyboardAwareView';
import { AppConfigurations } from '../../model/AppConfigurations';
import useContentNavigator from '../../components/hooks/useContentNavigator';

const styles = StyleSheet.create({
  findPlaceholderImage: {
    marginTop: 120,
    height: 120,
    width: 'auto',
    resizeMode: 'contain',
  },
  noResultsTextSize: { fontSize: 15 },
  noResultContainer: { flex: 1, margin: 20 },
});

interface Props {
  setChapterSearchText: (searchText: SearchText) => void;
  route: RouteProp<
    {
      params: {
        appConfigurations: AppConfigurations;
      };
    },
    'params'
  >;
}

const SearchScreen: FC<Props> = ({ setChapterSearchText, route }) => {
  const { appConfigurations } = route.params;
  const [bookType, setBookType] = useState<string>(
    appConfigurations.defaultBookTypeSearch,
  );
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const { navigateToChapter } = useContentNavigator();

  useEffect(() => {
    if (searchText === '') {
      setArticles(null);
      return;
    }
    articleRepository.searchArticles(bookType, searchText, setArticles);
  }, [bookType, searchText]);

  const handleSearchTextChange = (searchedText: string): void =>
    setSearchText(searchedText);

  const handleBookTypeTabChange = (type: string): void => {
    setArticles(null);
    setBookType(type);
  };

  const getShortenedBody = (fullBody: string): string => {
    const firstOccurrence: number = fullBody
      .toLowerCase()
      .indexOf(searchText.toLowerCase());
    const bodyLength = fullBody.replace('\n', '').length;
    if (firstOccurrence < 100 && bodyLength > 100) {
      return `${fullBody.replace('\n', '').substring(0, 100)}...`;
    }
    if (bodyLength > 200) {
      return `...${fullBody.substring(
        firstOccurrence - 50,
        firstOccurrence + 50,
      )}...`;
    }
    return fullBody;
  };

  const submitSearch = (item: Article) => {
    setChapterSearchText({
      chapter: item.chapter,
      searchText,
      bookType,
    });
    navigateToChapter(
      {
        articleChapter: item.chapter,
        bookType,
        searchText: { chapter: item.chapter, searchText },
      },
      bookType,
    );
  };

  const renderItem = (item: Article) => (
    <ListItem bottomDivider onPress={() => submitSearch(item)}>
      <SVGIcon iconBlob={item.iconFile} />
      <ListItem.Content>
        <ListItem.Title>
          <HighlightWords
            searchText={searchText}
            textToHighlight={item.title}
          />
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: 'grey' }}>
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
      handleBookTypeTabChange={handleBookTypeTabChange}
      handleSearchTextChange={handleSearchTextChange}
      searchText={searchText}
    >
      <KeyboardAwareView>
        {!articles && searchText === '' && (
          <Image
            style={styles.findPlaceholderImage}
            source={require('../../../assets/images/find.png')}
          />
        )}
        {articles && articles.length === 0 && searchText !== '' && (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultsTextSize}>
              Geen zoekresultaten.{`\n\n`}
              <Text>Suggesties:{`\n`}</Text>
              <Text>
                - Zorg ervoor dat de zoekopdracht goed gespeld is.{`\n`}
              </Text>
              <Text>- Gebruik andere trefwoorden.{`\n`}</Text>
              <Text>- Zoek in een andere categorie.{`\n`}</Text>
            </Text>
          </View>
        )}
        {articles && (
          <FlatList<Article>
            data={articles}
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
