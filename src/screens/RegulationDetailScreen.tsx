import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { View, Linking, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import RegulationRepository, {
  Regulation,
} from '../database/regulationRepository';
import highlightWordsInHTMLFile from '../helper/highlightWordsInHTMLFile';

interface Props {
  route: RouteProp<
    { params: { regulationChapter: string; searchText?: string } },
    'params'
  >;
}

const RegulationDetailScreen: React.FC<Props> = route => {
  const [regulation, setRegulation] = React.useState<Regulation | null>();
  const [highlightText, setHighlightedText] = React.useState<string>('');
  const webview = React.createRef<WebView>();

  const { regulationChapter, searchText } = route.route.params;
  const navigation = useNavigation();

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

  const openExternalLink = (request: ShouldStartLoadRequest) => {
    const isHTTPS = request.url.search('https://') !== -1;

    if (isHTTPS) {
      Linking.openURL(request.url);
      return false;
    }
    if (request.url.startsWith('http://')) {
      navigation.navigate('RegulationDetailsScreen', {
        regulationChapter: request.url.split('http://127.0.0.1/')[1] ?? '1',
      });
    }
    return false;
  };

  // const stopPageLoad = (): void => {
  //   return Platform.OS === 'ios'
  //     ? webview?.current?.stopLoading()
  //     : webview?.current?.goBack();
  // };

  // onShouldStartLoadWithRequest(navigator) {
  //   if (navigator.url.indexOf(INTERCEPT_URL) === -1) {
  //     return true;
  //   } else {
  //     this.refs[WEBVIEW_REF].stopLoading(); //Some reference to your WebView to make it stop loading that URL
  //     return false;
  //   }
  // }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webview}
        startInLoadingState
        originWhitelist={['http://*', 'https://*']}
        scalesPageToFit={false}
        onShouldStartLoadWithRequest={openExternalLink}
        onNavigationStateChange={() => {
          webview?.current?.stopLoading();
        }}
        source={{ html: getDocumentation() }}
      />
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
