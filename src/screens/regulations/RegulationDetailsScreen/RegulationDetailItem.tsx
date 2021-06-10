import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import articleRepository from '../../../database/repository/articleRepository';
import ScrollAwareBottomButton from '../../../components/ScrollAwareBottomButton';
import searching, { SearchText } from '../../../redux/actions/searching';
import HTMLViewer from '../../../components/HTMLViewer';
import { Article } from '../../../database/entity/Article';

interface Props {
  regulationChapter: string;
  chapterSearchText: SearchText;
  setChapterSearchText: (searchText: SearchText) => void;
}

const RegulationDetailItem: React.FC<Props> = ({
  regulationChapter,
  chapterSearchText,
  setChapterSearchText,
}) => {
  const [regulation, setRegulation] = React.useState<Article | null>();
  const [highlightText, setHighlightedText] = React.useState<string>('');

  React.useEffect(() => {
    if (chapterSearchText.chapter === regulation?.chapter) {
      setHighlightedText(chapterSearchText.searchText ?? '');
    }
  }, [regulation, chapterSearchText]);

  React.useEffect(() => {
    articleRepository.getArticleByChapter(regulationChapter, setRegulation);
  }, [regulationChapter]);

  const stopHighlightText = () => {
    setChapterSearchText({ chapter: '', searchText: '' });
    setHighlightedText('');
  };

  return (
    <View style={{ flex: 1 }}>
      {regulation && (
        <>
          <HTMLViewer
            htmlFile={regulation?.htmlFile}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegulationDetailItem);
