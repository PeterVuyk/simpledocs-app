import React from 'react';
import { RouteProp } from '@react-navigation/native';
import WebView from 'react-native-webview';

interface RegulationsContent {
  id: number;
  index: number;
  chapter: string;
  // eslint-disable-next-line camelcase
  icon_path: string;
  title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
}

interface Props {
  route: RouteProp<
    { params: { regulationsContent: RegulationsContent } },
    'params'
  >;
}

const DocumentationViewScreen: React.FC<Props> = route => {
  const { regulationsContent } = route.route.params;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: regulationsContent.body }}
    />
  );
};

export default DocumentationViewScreen;
