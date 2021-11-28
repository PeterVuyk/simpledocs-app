import React, { FC } from 'react';
import { ListItem } from 'react-native-elements';
import { View } from 'react-native';
import SVGIcon from '../../../components/SVGIcon';
import HighlightWords from '../../../components/HighlightWords';
import useContentNavigator from '../../../components/hooks/useContentNavigator';
import { useAppDispatch } from '../../../redux/hooks';
import { setSearchText as setReduxSearchText } from '../../../redux/slice/searchTextSlice';
import BookmarkIndicator from '../../../components/listItem/BookmarkIndicator';
import globalStyle from '../../../styling/globalStyle';
import { BookPage } from '../../../model/bookPages/BookPage';

interface Props {
  searchText: string;
  bookPage: BookPage;
}

const SearchScreenListPageItem: FC<Props> = ({ searchText, bookPage }) => {
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

  const submitSearch = (item: BookPage) => {
    dispatch(
      setReduxSearchText({
        chapter: item.chapter,
        searchText,
        bookType: item.bookType,
      }),
    );
    navigateToChapter(
      {
        bookPageChapter: item.chapter,
        bookType: item.bookType,
        searchText: { chapter: item.chapter, searchText },
      },
      item.bookType,
    );
  };

  return (
    <View style={{ position: 'relative' }}>
      <ListItem bottomDivider onPress={() => submitSearch(bookPage)}>
        <SVGIcon iconBlob={bookPage.iconFile} />
        <ListItem.Content>
          <ListItem.Title>
            <HighlightWords
              searchText={searchText}
              textToHighlight={bookPage.title}
            />
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: globalStyle.color.default.dark }}>
            <HighlightWords
              searchText={searchText}
              textToHighlight={getShortenedBody(bookPage.searchText)}
            />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      {bookPage.bookmarked ? <BookmarkIndicator /> : null}
    </View>
  );
};

export default SearchScreenListPageItem;
