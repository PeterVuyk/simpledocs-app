import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import searching, { SearchText } from '../../../redux/actions/searching';
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

interface Props {
  articleChapter: string;
  bookType: string;
  chapterSearchText: SearchText;
  setChapterSearchText: (searchText: SearchText) => void;
}

const ArticleDetailItem: FC<Props> = ({
  articleChapter,
  chapterSearchText,
  setChapterSearchText,
  bookType,
}) => {
  const [article, setArticle] = useState<Article | null>();
  const [contentView, setContentView] = useState<ContentView | null>();

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
    setChapterSearchText({ chapter: '', searchText: '', bookType: null });
  };

  const getChapterSearchText = useCallback(() => {
    if (chapterSearchText.chapter === article?.chapter) {
      return chapterSearchText.searchText;
    }
    return '';
  }, [article, chapterSearchText]);

  const getContent2 = useCallback((): ContentView => {
    if (chapterSearchText.chapter === article?.chapter) {
      if (article.contentType === CONTENT_TYPE_HTML) {
        return highlightWordsInHTMLFile(
          article.content,
          getChapterSearchText(),
        );
      }
      if (article.contentType === CONTENT_TYPE_MARKDOWN) {
        return highlightWordsInMarkdownFile(
          article.content,
          getChapterSearchText(),
        );
      }
      return { content: article.content, hasHighlightedText: false };
    }
    return { content: article?.content ?? '', hasHighlightedText: false };
  }, [article, chapterSearchText.chapter, getChapterSearchText]);

  useEffect(() => {
    if (article) {
      setContentView(getContent2());
    }
  }, [article, getContent2]);

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
      {contentView.hasHighlightedText && getChapterSearchText() !== '' && (
        <ScrollAwareBottomButton
          title="Verwijder markering"
          onPress={stopHighlightText}
        />
      )}
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailItem);
