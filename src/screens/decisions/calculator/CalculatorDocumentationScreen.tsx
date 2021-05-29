import React from 'react';
import { RouteProp } from '@react-navigation/native';
import HTMLViewer from '../../../components/HTMLViewer';

interface Props {
  route: RouteProp<
    {
      params: {
        htmlFile: string;
      };
    },
    'params'
  >;
}

const CalculatorDocumentationScreen: React.FC<Props> = ({ route }) => {
  const { htmlFile } = route.params;

  return <HTMLViewer htmlFile={htmlFile} />;
};

export default CalculatorDocumentationScreen;
