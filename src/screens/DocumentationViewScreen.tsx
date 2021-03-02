import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import RegulationsRepository from '../database/RegulationsRepository';
import highlightWordsInHTMLFile from '../helper/highlightWordsInHTMLFile';

interface RegulationsContent {
  id: number;
  index: number;
  heading: string;
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
    { params: { regulationsContentId: number; searchText?: string } },
    'params'
  >;
}

const DocumentationViewScreen: React.FC<Props> = route => {
  const [
    regulationContent,
    setRegulationContent,
  ] = React.useState<RegulationsContent>();
  const [highlightText, setHighlightedText] = React.useState<string>('');

  const { regulationsContentId, searchText } = route.route.params;
  const navigation = useNavigation();

  React.useEffect(() => {
    setHighlightedText(searchText ?? '');
  }, [searchText]);

  React.useEffect(() => {
    RegulationsRepository.getRegulationsById(
      regulationsContentId,
      setRegulationContent,
    );
    if (regulationContent === null) {
      navigation.navigate('RegulationsScreen');
    }
  }, [regulationsContentId]);

  const getDocumentation = (): string => {
    if (regulationContent === undefined) {
      return '';
    }
    if (highlightText === '') {
      return regulationContent.body;
    }
    return highlightWordsInHTMLFile(regulationContent.body, highlightText);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        startInLoadingState
        originWhitelist={['*']}
        scalesPageToFit={false}
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
