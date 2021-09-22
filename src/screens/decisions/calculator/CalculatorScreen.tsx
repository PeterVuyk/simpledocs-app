import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import calculationsRepository from '../../../database/repository/calculationsRepository';
import TitleBar from '../../../components/TitleBar';
import OvertakingDistanceCalculator from './OvertakingDistanceCalculator';
import KeyboardAwareView from '../../../components/keyboard/KeyboardAwareView';
import { CalculationInfo } from '../../../model/CalculationInfo';
import {
  OVERTAKING_DISTANCE,
  STOPPING_DISTANCE,
} from '../../../model/CalculationType';
import StoppingDistanceCalculator from './StoppingDistanceCalculator';
import ContentViewer from '../../../components/viewer/ContentViewer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

interface Props {
  route: RouteProp<
    {
      params: {
        title: string;
      };
    },
    'params'
  >;
}

const CalculatorScreen: FC<Props> = ({ route }) => {
  const { title } = route.params;

  const [calculationInfo, setCalculationInfo] =
    useState<CalculationInfo | null>(null);

  useEffect(() => {
    calculationsRepository.getCalculationInfoByTitle(title, setCalculationInfo);
  }, [title]);

  if (!calculationInfo) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareView>
        <TitleBar
          title={calculationInfo.title}
          subTitle={calculationInfo.explanation}
        />
        {calculationInfo.calculationType === OVERTAKING_DISTANCE && (
          <OvertakingDistanceCalculator />
        )}
        {calculationInfo.calculationType === STOPPING_DISTANCE && (
          <StoppingDistanceCalculator />
        )}
        <ContentViewer
          content={calculationInfo.content}
          contentType={calculationInfo.contentType}
          bookType="calculations"
        />
      </KeyboardAwareView>
    </ScrollView>
  );
};

export default CalculatorScreen;
