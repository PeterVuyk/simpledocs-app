import React, { FC, useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import calculationsRepository from '../../../database/repository/calculationsRepository';
import ListItem from '../../../components/ListItem';
import BrakingDistanceCalculator from './BrakingDistanceCalculator';
import TitleBar from '../../../components/TitleBar';
import OvertakingDistanceCalculator from './OvertakingDistanceCalculator';
import KeyboardAwareView from '../../../components/keyboard/KeyboardAwareView';
import { CalculationInfo } from '../../../model/CalculationInfo';
import {
  BRAKING_DISTANCE,
  OVERTAKING_DISTANCE,
  REACTION_PATH_DISTANCE,
  STOPPING_DISTANCE,
} from '../../../model/CalculationType';
import StoppingDistanceCalculator from './StoppingDistanceCalculator';
import ReactionDistanceCalculator from './ReactionDistanceCalculator';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 'auto',
    aspectRatio: 4 / 3,
    resizeMode: 'center',
    marginLeft: 10,
    marginRight: 10,
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

  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    calculationsRepository.getCalculationInfoByTitle(title, setCalculationInfo);
  }, [title]);

  const navigateDecisionTree = (info: CalculationInfo) => {
    navigation.navigate('DecisionsScreenStack', {
      screen: 'DocumentationScreen',
      params: { htmlFile: info.htmlFile },
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAwareView>
        {calculationInfo && (
          <>
            <TitleBar
              title={calculationInfo.title}
              subTitle={calculationInfo.explanation}
            />
            {calculationInfo.calculationType === BRAKING_DISTANCE && (
              <BrakingDistanceCalculator />
            )}
            {calculationInfo.calculationType === OVERTAKING_DISTANCE && (
              <OvertakingDistanceCalculator />
            )}
            {calculationInfo.calculationType === STOPPING_DISTANCE && (
              <StoppingDistanceCalculator />
            )}
            {calculationInfo.calculationType === REACTION_PATH_DISTANCE && (
              <ReactionDistanceCalculator />
            )}
            <ListItem
              onSubmit={() => navigateDecisionTree(calculationInfo)}
              iconFile={calculationInfo.iconFile}
              title={calculationInfo.articleButtonText}
            />
            <Image
              style={styles.image}
              source={{ uri: calculationInfo.calculationImage }}
            />
          </>
        )}
      </KeyboardAwareView>
    </ScrollView>
  );
};

export default CalculatorScreen;
