import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import { View } from 'react-native';
import { Article } from '../../../model/articles/Article';
import SVGIcon from '../../../components/SVGIcon';
import HighlightWords from '../../../components/HighlightWords';
import useContentNavigator from '../../../components/hooks/useContentNavigator';
import { useAppDispatch } from '../../../redux/hooks';
import { setSearchText as setReduxSearchText } from '../../../redux/slice/searchTextSlice';
import BookmarkIndicator from '../../../components/listItem/BookmarkIndicator';
import globalStyle from '../../../styling/globalStyle';

interface Props {
  searchText: string;
  article: Article;
}

const SearchScreenListPageItem: FC<Props> = ({ searchText, article }) => {
  const { navigateToChapter } = useContentNavigator();
  const dispatch = useAppDispatch();

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
    dispatch(
      setReduxSearchText({
        chapter: item.chapter,
        searchText,
        bookType: item.bookType,
      }),
    );
    navigateToChapter(
      {
        articleChapter: item.chapter,
        bookType: item.bookType,
        searchText: { chapter: item.chapter, searchText },
      },
      item.bookType,
    );
  };

  return (
    <View style={{ position: 'relative' }}>
      <ListItem bottomDivider onPress={() => submitSearch(article)}>
        <SVGIcon iconBlob={article.iconFile} />
        <ListItem.Content>
          <ListItem.Title>
            <HighlightWords
              searchText={searchText}
              textToHighlight={article.title}
            />
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: globalStyle.color.default.dark }}>
            <HighlightWords
              searchText={searchText}
              textToHighlight={getShortenedBody(article.searchText)}
            />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      {article.bookmarked ? <BookmarkIndicator /> : null}
    </View>
  );
};

export default SearchScreenListPageItem;
