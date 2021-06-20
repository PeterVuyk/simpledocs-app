import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import searching, { SearchText } from '../../redux/actions/searching';
import { Article } from '../../model/Article';
import articleRepository from '../../database/repository/articleRepository';
import HTMLViewer from '../../components/HTMLViewer';
import ScrollAwareBottomButton from '../../components/ScrollAwareBottomButton';
import { ArticleType } from '../../model/ArticleType';

interface Props {
  articleChapter: string;
  articleType: ArticleType;
  chapterSearchText: SearchText;
  setChapterSearchText: (searchText: SearchText) => void;
}

const ArticleDetailItem: FC<Props> = ({
  articleChapter,
  chapterSearchText,
  setChapterSearchText,
  articleType,
}) => {
  const [article, setArticle] = useState<Article | null>();
  const [highlightText, setHighlightedText] = useState<string>('');

  useEffect(() => {
    if (
      chapterSearchText.chapter === article?.chapter &&
      chapterSearchText.articleType === articleType
    ) {
      setHighlightedText(chapterSearchText.searchText ?? '');
    }
  }, [article, articleType, chapterSearchText]);

  useEffect(() => {
    articleRepository.getArticleByChapter(
      articleType,
      articleChapter,
      setArticle,
    );
  }, [articleType, articleChapter]);

  const stopHighlightText = () => {
    setChapterSearchText({ chapter: '', searchText: '', articleType: null });
    setHighlightedText('');
  };

  return (
    <View style={{ flex: 1 }}>
      {article && (
        <>
          <HTMLViewer
            htmlFile={article?.htmlFile}
            highlightText={highlightText}
            articleType={articleType}
          />
          {highlightText !== '' && (
            <ScrollAwareBottomButton
              title="Verwijder markering"
              onPress={stopHighlightText}
            />
          )}
        </>
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
