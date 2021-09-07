import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import HTMLViewer from '../../components/HTMLViewer';
import {
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
  ContentType,
} from '../../model/ContentType';

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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ height: '100%' }}
        >
          <Markdown>{content}</Markdown>
        </ScrollView>
      )}
    </>
  );
};

export default DocumentationScreen;
