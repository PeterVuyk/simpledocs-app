import React, { FC } from 'react';
import { RouteProp } from '@react-navigation/native';
import { ContentType } from '../../model/ContentType';
import ContentViewer from '../../components/viewer/content/ContentViewer';

interface Props {
  route: RouteProp<
    {
      params: {
        content: string;
        contentType: ContentType;
      };
    },
    'params'
  >;
}

const DocumentationScreen: FC<Props> = ({ route }) => {
  const { content, contentType } = route.params;

  return (
    <ContentViewer
      content={content}
      contentType={contentType}
      bookType="decisions"
    />
  );
};

export default DocumentationScreen;
