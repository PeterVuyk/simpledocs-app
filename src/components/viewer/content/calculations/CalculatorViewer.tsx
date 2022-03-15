import React, { FC, useEffect, useState } from 'react';
import { LogBox, ScrollView, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import TitleBar from '../../../../components/titleBar/TitleBar';
import OvertakingDistanceCalculator from './OvertakingDistanceCalculator';
import KeyboardAwareView from '../../../../components/keyboard/KeyboardAwareView';
import { CalculationInfo } from '../../../../model/calculations/CalculationInfo';
import {
  OVERTAKING_DISTANCE,
  STOPPING_DISTANCE,
} from '../../../../model/calculations/CalculationType';
import StoppingDistanceCalculator from './StoppingDistanceCalculator';
import ContentViewer from '../../../../components/viewer/content/ContentViewer';
import globalStyle from '../../../../styling/globalStyle';
import IntentContentPage from '../../../intent/IntentContentPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.color.white,
  },
});

interface Props {
  content: string;
  bookType: string;
}

const CalculatorViewer: FC<Props> = ({ content, bookType }) => {
  const [calculationInfo, setCalculationInfo] =
    useState<CalculationInfo | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    // For now just to be sure we only want to set the calculations when the user first time opens the page.
    // If the user has a slow phone and a book contains a lot of calculations, decision trees and other heavy
    // components then the user experience could slow down.
    if (isFocused && !calculationInfo) {
      setCalculationInfo(JSON.parse(content));
    }
  }, [isFocused, calculationInfo, content]);

  if (!calculationInfo) {
    return <IntentContentPage />;
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
          bookType={bookType}
        />
      </KeyboardAwareView>
    </ScrollView>
  );
};

export default CalculatorViewer;
