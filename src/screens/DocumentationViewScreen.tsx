import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import RegulationsRepository from '../database/RegulationsRepository';

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
  route: RouteProp<{ params: { regulationsContentId: number } }, 'params'>;
}

const DocumentationViewScreen: React.FC<Props> = route => {
  const [
    regulationContent,
    setRegulationContent,
  ] = React.useState<RegulationsContent>();

  const navigation = useNavigation();
  const { regulationsContentId } = route.route.params;

  React.useEffect(() => {
    RegulationsRepository.getRegulationsById(
      regulationsContentId,
      setRegulationContent,
    );
    if (regulationContent === null) {
      navigation.navigate('RegulationsScreen');
    }
  }, [regulationsContentId]);

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: regulationContent?.body ?? '' }}
    />
  );
};

export default DocumentationViewScreen;
