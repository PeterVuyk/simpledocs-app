import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import searching, { SearchText } from '../../redux/actions/searching';
import { Article } from '../../database/entity/Article';
import articleRepository from '../../database/repository/articleRepository';
import HTMLViewer from '../../components/HTMLViewer';
import ScrollAwareBottomButton from '../../components/ScrollAwareBottomButton';

interface Props {
  articleChapter: string;
  articleType: 'regulations' | 'instructionManual';
  chapterSearchText: SearchText;
  setChapterSearchText: (searchText: SearchText) => void;
}

const ArticleDetailItem: React.FC<Props> = ({
  articleChapter,
  chapterSearchText,
  setChapterSearchText,
  articleType,
}) => {
  const [article, setArticle] = React.useState<Article | null>();
  const [highlightText, setHighlightedText] = React.useState<string>('');

  React.useEffect(() => {
    if (chapterSearchText.chapter === article?.chapter) {
      setHighlightedText(chapterSearchText.searchText ?? '');
    }
  }, [article, chapterSearchText]);

  React.useEffect(() => {
    articleRepository.getArticleByChapter(
      articleType,
      articleChapter,
      setArticle,
    );
  }, [articleType, articleChapter]);

  const stopHighlightText = () => {
    setChapterSearchText({ chapter: '', searchText: '' });
    setHighlightedText('');
  };

  return (
    <View style={{ flex: 1 }}>
      {article && (
        <>
          <HTMLViewer
            htmlFile={article?.htmlFile}
            highlightText={highlightText}
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
