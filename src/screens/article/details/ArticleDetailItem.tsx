import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Article } from '../../../model/Article';
import articleRepository from '../../../database/repository/articleRepository';
import ScrollAwareBottomButton from '../../../components/ScrollAwareBottomButton';
import ContentViewer from '../../../components/viewer/ContentViewer';
import {
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
} from '../../../model/ContentType';
import highlightWordsInMarkdownFile from '../../../helper/highlightWordsInMarkdownFile';
import highlightWordsInHTMLFile from '../../../helper/highlightWordsInHTMLFile';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setSearchText } from '../../../redux/slice/searchTextSlice';

interface Props {
  articleChapter: string;
  bookType: string;
}

const ArticleDetailItem: FC<Props> = ({ articleChapter, bookType }) => {
  const [article, setArticle] = useState<Article | null>();
  const [contentView, setContentView] = useState<ContentView | null>();

  const searchText = useAppSelector(state => state.searchText);
  const dispatch = useAppDispatch();

  /**
   * To avoid the warning Can't perform a React state update on an unmounted component,
   * we check if the component is already mounted before we set the article.
   */
  useEffect(() => {
    let isMounted = true;
    articleRepository.getArticleByChapter(
      bookType,
      articleChapter,
      (articleResult: Article) => {
        if (isMounted) {
          setArticle(articleResult);
        }
      },
    );
    return () => {
      isMounted = false;
    };
  }, [bookType, articleChapter]);

  const stopHighlightText = () => {
    setContentView(null);
    dispatch(setSearchText({ chapter: '', searchText: '', bookType: null }));
  };

  const getSearchText = useCallback(() => {
    if (searchText.chapter === article?.chapter) {
      return searchText.searchText;
    }
    return '';
  }, [article, searchText]);

  const getContent = useCallback((): ContentView => {
    if (searchText.chapter === article?.chapter) {
      if (article.contentType === CONTENT_TYPE_HTML) {
        return highlightWordsInHTMLFile(article.content, getSearchText());
      }
      if (article.contentType === CONTENT_TYPE_MARKDOWN) {
        return highlightWordsInMarkdownFile(article.content, getSearchText());
      }
      return { content: article.content, hasHighlightedText: false };
    }
    return { content: article?.content ?? '', hasHighlightedText: false };
  }, [article, searchText.chapter, getSearchText]);

  useEffect(() => {
    if (article) {
      setContentView(getContent());
    }
  }, [article, getContent]);

  if (!article || !contentView) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ContentViewer
        content={contentView.content}
        contentType={article.contentType}
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

export default ArticleDetailItem;
