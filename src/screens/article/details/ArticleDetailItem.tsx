import React, { FC, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import searching, { SearchText } from '../../../redux/actions/searching';
import { Article } from '../../../model/Article';
import articleRepository from '../../../database/repository/articleRepository';
import HTMLViewer from '../../../components/viewer/HTMLViewer';
import ScrollAwareBottomButton from '../../../components/ScrollAwareBottomButton';
import {
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
} from '../../../model/ContentType';
import MarkdownViewer from '../../../components/viewer/MarkdownViewer';

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
    setChapterSearchText({ chapter: '', searchText: '', bookType: null });
  };

  const getChapterSearchText = useCallback(() => {
    if (chapterSearchText.chapter === article?.chapter) {
      return chapterSearchText.searchText;
    }
    return '';
  }, [article, chapterSearchText]);

  if (!article) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {article.contentType === CONTENT_TYPE_HTML && (
        <HTMLViewer
          htmlFile={article?.content}
          highlightText={getChapterSearchText()}
          bookType={bookType}
        />
      )}
      {article.contentType === CONTENT_TYPE_MARKDOWN && (
        <MarkdownViewer
          markdownFile={article.content}
          bookType={bookType}
          highlightText={getChapterSearchText()}
        />
      )}
      {getChapterSearchText() !== '' && (
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
