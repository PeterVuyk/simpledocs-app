import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { View, Linking, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import RegulationRepository, {
  Regulation,
} from '../database/repository/regulationRepository';
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
    webview?.current?.stopLoading();
    // TODO: check if this also works for IOS as well, or should we use 'goBack'?

    if (request.url.search('https://') !== -1) {
      Linking.openURL(request.url);
      return false;
    }
    if (request.url.search('http://') !== -1) {
      navigation.navigate('RegulationDetailsScreen', {
        regulationChapter: request.url.split('http://127.0.0.1/')[1] ?? '1',
      });
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webview}
        startInLoadingState
        originWhitelist={['http://*', 'https://*']}
        scalesPageToFit={false}
        onShouldStartLoadWithRequest={openExternalLink}
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
