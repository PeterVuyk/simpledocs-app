import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Linking, View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import ScrollViewToggleBottomBar from '../ScrollViewToggleBottomBar';
import useContentNavigator from '../hooks/useContentNavigator';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: globalStyle.color.white,
  },
});

interface Props {
  markdownFile: string;
  bookType: string;
}

const MarkdownViewer: FC<Props> = ({ markdownFile, bookType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { blankWebpage, navigateFromHttpsUrlToChapter } = useContentNavigator();

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);

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

  /**
   * Highlighting parts of text with markdown is not supported (yet) by the markdown plugin. Looked for alternatives but for markdown
   * this library is for now the way to go. For the search we need to highlight words search. Since markdown doesn't support it
   * and the user don't need inline code for the documentation, I added a workaround to use the inline code for marking search text.
   * In the future we need to check if highlighting is supported or other possibly better tools are available.
   */
  const rules = {
    code_inline: (
      node: any,
      children: ReactNode,
      parent: any,
      styles: any,
      inheritedStyles = {},
    ) => {
      if (node.markup === '```') {
        return (
          <Text key={node.key} style={[inheritedStyles, styles.code_inline]}>
            {node.content}
          </Text>
        );
      }
      return (
        <Text
          key={node.key}
          style={[
            inheritedStyles,
            { backgroundColor: 'yellow', color: 'black' },
          ]}
        >
          {node.content}
        </Text>
      );
    },
  };

  return (
    <View style={styles.viewContainer}>
      {!loading && (
        <ScrollViewToggleBottomBar>
          <Markdown onLinkPress={onLinkPress} rules={rules}>
            {`#\n${markdownFile}\n#\n#\n#\n#`}
          </Markdown>
        </ScrollViewToggleBottomBar>
      )}
    </View>
  );
};

export default MarkdownViewer;
