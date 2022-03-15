import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { BookPage } from '../../../model/bookPages/BookPage';
import bookPagesRepository from '../../../database/repository/bookPagesRepository';
import ScrollAwareBottomButton from '../../../components/ScrollAwareBottomButton';
import ContentViewer from '../../../components/viewer/content/ContentViewer';
import {
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
} from '../../../model/ContentType';
import highlightWordsInMarkdownFile from '../../../helper/highlightWordsInMarkdownFile';
import highlightWordsInHTMLFile from '../../../helper/highlightWordsInHTMLFile';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setSearchText } from '../../../redux/slice/searchTextSlice';

interface Props {
  bookPageChapter: string;
  bookType: string;
}

const BookPageDetailItem: FC<Props> = ({ bookPageChapter, bookType }) => {
  const [bookPage, setBookPage] = useState<BookPage | null>();
  const [contentView, setContentView] = useState<ContentView | null>();

  const searchText = useAppSelector(state => state.searchText);
  const dispatch = useAppDispatch();

  /**
   * To avoid the warning Can't perform a React state update on an unmounted component,
   * we check if the component is already mounted before we set the bookPage.
   */
  useEffect(() => {
    let isMounted = true;
    bookPagesRepository.getPageByChapter(
      bookType,
      bookPageChapter,
      (pageResult: BookPage) => {
        if (isMounted) {
          setBookPage(pageResult);
        }
      },
    );
    return () => {
      isMounted = false;
    };
  }, [bookType, bookPageChapter]);

  const stopHighlightText = () => {
    setContentView(null);
    dispatch(setSearchText({ chapter: '', searchText: '', bookType: null }));
  };

  const getSearchText = useCallback(() => {
    if (searchText.chapter === bookPage?.chapter) {
      return searchText.searchText;
    }
    return '';
  }, [bookPage, searchText]);

  const getContent = useCallback((): ContentView => {
    if (searchText.chapter === bookPage?.chapter) {
      if (bookPage.contentType === CONTENT_TYPE_HTML) {
        return highlightWordsInHTMLFile(bookPage.content, getSearchText());
      }
      if (bookPage.contentType === CONTENT_TYPE_MARKDOWN) {
        return highlightWordsInMarkdownFile(bookPage.content, getSearchText());
      }
      return { content: bookPage.content, hasHighlightedText: false };
    }
    return { content: bookPage?.content ?? '', hasHighlightedText: false };
  }, [bookPage, searchText.chapter, getSearchText]);

  useEffect(() => {
    if (bookPage) {
      setContentView(getContent());
    }
  }, [bookPage, getContent]);

  if (!bookPage || !contentView) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ContentViewer
        content={contentView.content}
        contentType={bookPage.contentType}
        bookType={bookType}
      />
      {contentView.hasHighlightedText && getSearchText() !== '' && (
        <ScrollAwareBottomButton
          title="Verwijder markering"
          onPress={stopHighlightText}
        />
      )}
    </View>
  );
};

export default React.memo(BookPageDetailItem);
