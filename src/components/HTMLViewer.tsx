import React, { createRef, FC, useEffect, useState } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { Linking, Platform, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import highlightWordsInHTMLFile from '../helper/highlightWordsInHTMLFile';
import ScrollViewToggleBottomBar from './ScrollViewToggleBottomBar';
import {
  ARTICLE_TYPE_INSTRUCTION_MANUAL,
  ARTICLE_TYPE_REGULATIONS,
  ArticleType,
} from '../model/ArticleType';

interface Props {
  htmlFile: string;
  highlightText?: string;
  articleType: ArticleType;
}

const HTMLViewer: FC<Props> = ({ htmlFile, highlightText, articleType }) => {
  const [webViewHeight, setWebViewHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const webview = createRef<WebView>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (loading && !isFocused) {
      setLoading(false);
    }
  }, [loading, isFocused]);

  /**
   * WebView inside a flatlist works fine until you need to scroll horizontally, then the vertical
   * scrol interferes with the horizontal scrol from the flatlist. To solve this we get the
   * scroll height from the html template and provide that height to the ScrollView
   */
  const injectedJavaScript = `
  window.ReactNativeWebView.postMessage(
    Math.max(document.body.offsetHeight, document.body.scrollHeight)
  );`;

  const onMessage = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  const getDocumentation = (): string => {
    if (highlightText === undefined || highlightText === '') {
      return htmlFile;
    }
    return highlightWordsInHTMLFile(htmlFile, highlightText ?? '');
  };

  const redirectToInstructionManual = (url: string): void => {
    const chapter =
      url.split('https://page-blank.firebaseapp.com/instructionManual/')[1] ??
      '1';

    if (articleType === ARTICLE_TYPE_INSTRUCTION_MANUAL) {
      navigation.push('InstructionManualDetailsScreen', {
        articleChapter: chapter,
      });
      return;
    }
    navigation.navigate('InstructionManualStack', {
      screen: 'InstructionManualDetailsScreen',
      params: { articleChapter: chapter },
    });
  };

  const redirectToRegulations = (url: string): void => {
    const chapter =
      url.split('https://page-blank.firebaseapp.com/regulations/')[1] ?? '1';

    if (articleType === ARTICLE_TYPE_REGULATIONS) {
      navigation.push('RegulationDetailsScreen', {
        articleChapter: chapter,
      });
      return;
    }
    navigation.navigate('RegulationsScreenStack', {
      screen: 'RegulationDetailsScreen',
      params: { articleChapter: chapter },
    });
  };

  /**
   * This function always returns false to tell webview that links should not be loaded inside the app. Only https request will be
   * opened in the default browser. We want to use the html links to switch between screens. Even though we tell Webview to stop
   * loading the page from the links href, once a while it will attempt to load the page anyway. So in addition:
   * - We hide the webview component while switching to the next screen.
   * - We use http:// instead of app:// to avoid UNKNOWN_URL_SCHEME (Webview doesn't work well with 'unofficial' URI schemes
   * - We use example.com instead of a local url to avoid ERR_CONNECTION_REFUSED (e.g. <a href="https://page-blank.firebaseapp.com/<articleType>/1.1">1.1</a> navigate to chapter 1.1)
   *
   * If the user returns to this page the useEffect hook will enable the webview component whereupon the html file is loaded again.
   */
  const openExternalLink = (request: ShouldStartLoadRequest) => {
    const isExternalLink =
      Platform.OS === 'ios' ? request.navigationType === 'click' : true;
    if (!isExternalLink) {
      return true;
    }

    webview?.current?.stopLoading();
    if (
      request.url.search('https://page-blank.firebaseapp.com/regulations/') !==
      -1
    ) {
      setLoading(true);
      redirectToRegulations(request.url);
      return false;
    }

    if (
      request.url.search(
        'https://page-blank.firebaseapp.com/instructionManual/',
      ) !== -1
    ) {
      setLoading(true);
      redirectToInstructionManual(request.url);
      return false;
    }

    if (request.url.search('https://') !== -1) {
      Linking.openURL(request.url);
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <ScrollViewToggleBottomBar pageHeight={webViewHeight ?? 0}>
          <WebView
            ref={webview}
            startInLoadingState
            originWhitelist={['https://*']}
            scalesPageToFit={false}
            onShouldStartLoadWithRequest={openExternalLink}
            onMessage={onMessage}
            javaScriptEnabled
            domStorageEnabled
            injectedJavaScript={injectedJavaScript}
            source={{ html: getDocumentation() }}
          />
        </ScrollViewToggleBottomBar>
      )}
    </View>
  );
};

export default HTMLViewer;
