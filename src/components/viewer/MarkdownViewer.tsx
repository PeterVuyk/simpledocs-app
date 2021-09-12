import React, { FC, useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import ScrollViewToggleBottomBar from '../ScrollViewToggleBottomBar';
import useContentNavigator from '../hooks/useContentNavigator';

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
  const { blankWebpage, navigateFromHttpsUrlToChapter } = useContentNavigator();

  useEffect(() => {
    if (loading && !isFocused) {
      setLoading(false);
    }
  }, [loading, isFocused]);

  const onLinkPress = (url: string) => {
    if (url && url.search(blankWebpage) !== -1) {
      setLoading(true);
      navigateFromHttpsUrlToChapter(url, bookType);
      return false;
    }

    if (url && url.search('https://') !== -1) {
      Linking.openURL(url);
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <ScrollViewToggleBottomBar>
          <Markdown onLinkPress={onLinkPress}>{markdownFile}</Markdown>
        </ScrollViewToggleBottomBar>
      )}
    </View>
  );
};

export default MarkdownViewer;
