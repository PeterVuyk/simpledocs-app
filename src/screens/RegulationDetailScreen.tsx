import React from 'react';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import WebView from 'react-native-webview';
import { View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import RegulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';
import highlightWordsInHTMLFile from '../helper/highlightWordsInHTMLFile';

interface Props {
  route: RouteProp<
    {
      params: {
        regulationChapter: string;
        forwardedTo: string;
        searchText?: string;
      };
    },
    'params'
  >;
}

const RegulationDetailScreen: React.FC<Props> = route => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [regulation, setRegulation] = React.useState<Regulation | null>();
  const [highlightText, setHighlightedText] = React.useState<string>('');

  const webview = React.createRef<WebView>();

  const navigation = useNavigation<StackNavigationProp<any>>();
  const isFocused = useIsFocused();
  const { regulationChapter, searchText } = route.route.params;

  React.useEffect(() => {
    if (loading && !isFocused) {
      setLoading(false);
    }
  }, [loading, isFocused]);

  React.useEffect(() => {
    setHighlightedText(searchText ?? '');
  }, [searchText]);

  React.useEffect(() => {
    RegulationRepository.getRegulationByChapter(
      regulationChapter,
      setRegulation,
    );
  }, [regulationChapter]);

  const getDocumentation = (): string => {
    if (regulation === undefined || regulation === null) {
      return '';
    }
    if (highlightText === '') {
      return regulation.body;
    }
    return highlightWordsInHTMLFile(regulation.body, highlightText);
  };

  /**
   * This function always returns false to tell webview that links should not be loaded inside the app. Only https request will be
   * opened in the default browser. We want to use the html links to switch between screens. Even though we tell Webview to stop
   * loading the page from the links href, once a while it will attempt to load the page anyway. So in addition:
   * - We hide the webview component while switching to the next screen.
   * - We use http:// instead of app:// to avoid UNKNOWN_URL_SCHEME (Webview doesn't work well with 'unofficial' URI schemes
   * - We use example.com instead of a local url to avoid ERR_CONNECTION_REFUSED (e.g. <a href="http://example.com/1.1">1.1</a> navigate to chapter 1.1)
   *
   * If the user returns to this page the useEffect hook will enable the webview component whereupon the html file is loaded again.
   */
  const openExternalLink = (request: ShouldStartLoadRequest) => {
    webview?.current?.stopLoading();

    if (request.url.search('https://') !== -1) {
      Linking.openURL(request.url);
      return false;
    }
    if (request.url.search('http://example.com/') !== -1) {
      setLoading(true);
      navigation.push('RegulationDetailsScreen', {
        regulationChapter: request.url.split('http://example.com/')[1] ?? '1',
      });
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      {!loading && (
        <WebView
          ref={webview}
          startInLoadingState
          originWhitelist={['http://*', 'https://*']}
          scalesPageToFit={false}
          onShouldStartLoadWithRequest={openExternalLink}
          source={{ html: getDocumentation() }}
        />
      )}
      {highlightText !== '' && (
        <View
          style={{
            margin: 5,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          <Button
            title="Verwijder markering"
            onPress={() => setHighlightedText('')}
          />
        </View>
      )}
    </View>
  );
};

export default RegulationDetailScreen;