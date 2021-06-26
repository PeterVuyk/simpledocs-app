import React from 'react';
import { RouteProp } from '@react-navigation/native';
import HTMLViewer from '../../components/HTMLViewer';
import { ARTICLE_TYPE_CALCULATIONS } from '../../model/ArticleType';

interface Props {
  route: RouteProp<
    {
      params: {
        htmlFile: string;
      };
    },
    'params'
  >;
}

const DocumentationScreen: React.FC<Props> = ({ route }) => {
  const { htmlFile } = route.params;

  return (
    <HTMLViewer articleType={ARTICLE_TYPE_CALCULATIONS} htmlFile={htmlFile} />
  );
};

export default DocumentationScreen;
