import React, { FC } from 'react';
import { View } from 'react-native';
import {
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
  ContentType,
} from '../../model/ContentType';
import HTMLViewer from './HTMLViewer';
import MarkdownViewer from './MarkdownViewer';

interface Props {
  content: string;
  contentType: ContentType;
  highlightText?: string;
  bookType: string;
}

const ContentViewer: FC<Props> = ({
  content,
  contentType,
  highlightText,
  bookType,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {contentType === CONTENT_TYPE_HTML && (
        <HTMLViewer
          htmlFile={content}
          highlightText={highlightText}
          bookType={bookType}
        />
      )}
      {contentType === CONTENT_TYPE_MARKDOWN && (
        <MarkdownViewer
          markdownFile={content}
          bookType={bookType}
          highlightText={highlightText}
        />
      )}
    </View>
  );
};

export default ContentViewer;
