import React from 'react';
import { RouteProp } from '@react-navigation/native';
import HTMLViewer from '../../components/viewer/HTMLViewer';
import {
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
  ContentType,
} from '../../model/ContentType';
import MarkdownViewer from '../../components/viewer/MarkdownViewer';

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

const DocumentationScreen: React.FC<Props> = ({ route }) => {
  const { content, contentType } = route.params;

  return (
    <>
      {contentType === CONTENT_TYPE_HTML && (
        <HTMLViewer bookType="decisions" htmlFile={content} />
      )}
      {contentType === CONTENT_TYPE_MARKDOWN && (
        <MarkdownViewer markdownFile={content} bookType="decisions" />
      )}
    </>
  );
};

export default DocumentationScreen;
