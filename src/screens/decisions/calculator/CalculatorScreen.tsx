import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import calculationsRepository from '../../../database/repository/calculationsRepository';
import TitleBar from '../../../components/titleBar/TitleBar';
import OvertakingDistanceCalculator from './OvertakingDistanceCalculator';
import KeyboardAwareView from '../../../components/keyboard/KeyboardAwareView';
import { CalculationInfo } from '../../../model/calculations/CalculationInfo';
import {
  OVERTAKING_DISTANCE,
  STOPPING_DISTANCE,
} from '../../../model/calculations/CalculationType';
import StoppingDistanceCalculator from './StoppingDistanceCalculator';
import ContentViewer from '../../../components/viewer/ContentViewer';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
  },
});

interface Props {
  title: string;
}

const CalculatorScreen: FC<Props> = ({ title }) => {
  const [calculationInfo, setCalculationInfo] =
    useState<CalculationInfo | null>(null);

  useEffect(() => {
    calculationsRepository.getCalculationInfoByTitle(title, setCalculationInfo);
  }, [title]);

  if (!calculationInfo) {
    return null;
  }
  return (
    <ScrollView style={styles.tabContainer}>
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
