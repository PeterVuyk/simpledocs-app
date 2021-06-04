import React from 'react';
import { RouteProp } from '@react-navigation/native';
import HTMLViewer from '../../components/HTMLViewer';
import RegulationRepository, {
  Regulation,
} from '../../database/repository/regulationRepository';

interface Props {
  route: RouteProp<
    {
      params: {
        regulationChapter: string;
      };
    },
    'params'
  >;
}

const DecisionTreeDocumentationScreen: React.FC<Props> = ({ route }) => {
  const { regulationChapter } = route.params;
  const [regulation, setRegulation] = React.useState<Regulation | null>();

  React.useEffect(() => {
    RegulationRepository.getRegulationByChapter(
      regulationChapter,
      setRegulation,
    );
  }, [regulationChapter]);

  return <>{regulation && <HTMLViewer htmlFile={regulation.htmlFile} />}</>;
};

export default DecisionTreeDocumentationScreen;
