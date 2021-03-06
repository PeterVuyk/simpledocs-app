import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { View, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import RegulationsRepository from '../database/RegulationsRepository';
import highlightWordsInHTMLFile from '../helper/highlightWordsInHTMLFile';

interface RegulationsContent {
  index: number;
  chapter: string;
  level: string;
  title: string;
  // eslint-disable-next-line camelcase
  sub_title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
}

interface Props {
  route: RouteProp<
    { params: { regulationsContentChapter: string; searchText?: string } },
    'params'
  >;
}

const DocumentationViewScreen: React.FC<Props> = route => {
  const [
    regulationContent,
    setRegulationContent,
  ] = React.useState<RegulationsContent>();
  const [highlightText, setHighlightedText] = React.useState<string>('');

  const { regulationsContentChapter, searchText } = route.route.params;
  const navigation = useNavigation();

  React.useEffect(() => {
    setHighlightedText(searchText ?? '');
  }, [searchText]);

  React.useEffect(() => {
    RegulationsRepository.getRegulationsByChapter(
      regulationsContentChapter,
      setRegulationContent,
    );
    if (regulationContent === null) {
      navigation.navigate('RegulationsScreen');
    }
  }, [regulationsContentChapter]);

  const getDocumentation = (): string => {
    if (regulationContent === undefined) {
      return '';
    }
    if (highlightText === '') {
      return regulationContent.body;
    }
    return highlightWordsInHTMLFile(regulationContent.body, highlightText);
  };

  const openExternalLink = (request: ShouldStartLoadRequest) => {
    const isHTTPS = request.url.search('https://') !== -1;

    if (isHTTPS) {
      Linking.openURL(request.url);
      return false;
    }
    if (request.url.startsWith('regulations://')) {
      navigation.navigate('DocumentationViewScreen', {
        regulationsContentChapter: request.url.split('regulations://')[1],
      });
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        startInLoadingState
        originWhitelist={['*']}
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
            onPress={event => setHighlightedText('')}
          />
        </View>
      )}
    </View>
  );
};

export default DocumentationViewScreen;
