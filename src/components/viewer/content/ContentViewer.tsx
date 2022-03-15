import React, { FC } from 'react';
import { View } from 'react-native';
import {
  CONTENT_TYPE_CALCULATIONS,
  CONTENT_TYPE_HTML,
  CONTENT_TYPE_MARKDOWN,
  ContentType,
} from '../../../model/ContentType';
import HTMLViewer from './HTMLViewer';
import MarkdownViewer from './MarkdownViewer';
import CalculatorViewer from './calculations/CalculatorViewer';

interface Props {
  content: string;
  contentType: ContentType;
  bookType: string;
}

const ContentViewer: FC<Props> = ({ content, contentType, bookType }) => {
  return (
    <View style={{ flex: 1 }}>
      {contentType === CONTENT_TYPE_HTML && (
        <HTMLViewer htmlFile={content} bookType={bookType} />
      )}
      {contentType === CONTENT_TYPE_MARKDOWN && (
        <MarkdownViewer markdownFile={content} bookType={bookType} />
      )}
      {contentType === CONTENT_TYPE_CALCULATIONS && (
        <CalculatorViewer content={content} bookType={bookType} />
      )}
    </View>
  );
};

export default ContentViewer;
