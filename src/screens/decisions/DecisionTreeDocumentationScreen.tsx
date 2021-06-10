import React from 'react';
import { RouteProp } from '@react-navigation/native';
import HTMLViewer from '../../components/HTMLViewer';
import { Article } from '../../database/entity/Article';
import articleRepository from '../../database/repository/articleRepository';

interface Props {
  route: RouteProp<
    {
      params: {
        regulationChapter: string;
      };
    },
    'params'
  >;
}

const DecisionTreeDocumentationScreen: React.FC<Props> = ({ route }) => {
  const { regulationChapter } = route.params;
  const [regulation, setRegulation] = React.useState<Article | null>();

  React.useEffect(() => {
    articleRepository.getArticleByChapter(regulationChapter, setRegulation);
  }, [regulationChapter]);

  return <>{regulation && <HTMLViewer htmlFile={regulation.htmlFile} />}</>;
};

export default DecisionTreeDocumentationScreen;
