import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import ScrollViewToggleBottomBar from '../ScrollViewToggleBottomBar';

interface Props {
  markdownFile: string;
  highlightText?: string;
  bookType: string;
}

const MarkdownViewer: FC<Props> = ({
  markdownFile,
  highlightText,
  bookType,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (loading && !isFocused) {
      setLoading(false);
    }
  }, [loading, isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <ScrollViewToggleBottomBar>
          <Markdown>{markdownFile}</Markdown>
        </ScrollViewToggleBottomBar>
      )}
    </View>
  );
};

export default MarkdownViewer;
