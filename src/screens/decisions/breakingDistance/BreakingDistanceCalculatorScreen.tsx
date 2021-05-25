import React, { useState } from 'react';
import { Image, View, StyleSheet, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import breakingDistanceRepository, {
  BreakingDistanceInfo,
} from '../../../database/repository/breakingDistanceRepository';
import ListItem from '../../../components/ListItem';
import BreakingDistanceCalculator from './BreakingDistanceCalculator';
import HideWithKeyboardView from '../../../components/HideWithKeyboardView';
import TitleBar from '../../../components/TitleBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 60,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  calculatorContainer: {
    margin: 10,
  },
});

const BreakingDistanceCalculatorScreen: React.FC = () => {
  const [breakingDistanceInfo, setBreakingDistanceInfo] =
    useState<BreakingDistanceInfo | null>(null);

  const navigation = useNavigation<StackNavigationProp<any>>();

  React.useEffect(() => {
    breakingDistanceRepository.getBreakingDistanceInfo(setBreakingDistanceInfo);
  }, []);

  return (
    <View onTouchStart={Keyboard.dismiss} style={styles.container}>
      {breakingDistanceInfo && (
        <>
          <TitleBar
            title={breakingDistanceInfo.title}
            subTitle={breakingDistanceInfo.explanation}
          />
          <BreakingDistanceCalculator />
          <ListItem
            onSubmit={() =>
              navigation.navigate('BreakingDistanceDocumentationScreen', {
                htmlFile: breakingDistanceInfo.htmlFile,
              })
            }
            iconFile={breakingDistanceInfo.iconFile}
            title={breakingDistanceInfo.regulationButtonText}
          />
          <View />
          <HideWithKeyboardView style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: breakingDistanceInfo.breakingDistanceImage }}
            />
          </HideWithKeyboardView>
        </>
      )}
    </View>
  );
};

export default BreakingDistanceCalculatorScreen;
