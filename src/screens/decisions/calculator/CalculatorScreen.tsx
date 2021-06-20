import React, { FC, useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import calculationsRepository from '../../../database/repository/calculationsRepository';
import ListItem from '../../../components/ListItem';
import BreakingDistanceCalculator from './BreakingDistanceCalculator';
import HideWithKeyboardView from '../../../components/keyboard/HideWithKeyboardView';
import TitleBar from '../../../components/TitleBar';
import OvertakingDistanceCalculator from './OvertakingDistanceCalculator';
import KeyboardAwareView from '../../../components/keyboard/KeyboardAwareView';
import { CalculationInfo } from '../../../model/CalculationInfo';
import { ARTICLE_TYPE_REGULATIONS } from '../../../model/ArticleType';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
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
    if (info.articleType === ARTICLE_TYPE_REGULATIONS) {
      navigation.navigate('RegulationsScreenStack', {
        screen: 'RegulationDetailsScreen',
        params: { articleChapter: info.articleChapter },
      });
      return;
    }
    navigation.navigate('InstructionManualStack', {
      screen: 'InstructionManualDetailsScreen',
      params: { articleChapter: info.articleChapter },
    });
  };

  return (
    <KeyboardAwareView>
      {calculationInfo && (
        <>
          <TitleBar
            title={calculationInfo.title}
            subTitle={calculationInfo.explanation}
          />
          {calculationInfo.calculationType === 'breakingDistance' && (
            <BreakingDistanceCalculator />
          )}
          {calculationInfo.calculationType === 'overtakingDistance' && (
            <OvertakingDistanceCalculator />
          )}
          <ListItem
            onSubmit={() => navigateDecisionTree(calculationInfo)}
            iconFile={calculationInfo.iconFile}
            title={calculationInfo.articleButtonText}
          />
          <View />
          <HideWithKeyboardView style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: calculationInfo.calculationImage }}
            />
          </HideWithKeyboardView>
        </>
      )}
    </KeyboardAwareView>
  );
};

export default CalculatorScreen;
