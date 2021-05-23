import React, { useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import breakingDistanceRepository, {
  BreakingDistanceInfo,
} from '../../database/repository/breakingDistanceRepository';
import ListItem from '../../components/ListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginBottom: 60,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
  headerTitleContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#154594',
    alignSelf: 'center',
  },
  headerSubTitle: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 15,
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
  const [number, onChangeNumber] = React.useState<string>('0');
  const [breakingDistanceInfo, setBreakingDistanceInfo] =
    useState<BreakingDistanceInfo | null>(null);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToRegulationHandle = () => {
    const chapter = breakingDistanceInfo?.regulationChapter;
    navigation.navigate('RegulationsScreenStack', {
      screen: 'RegulationDetailsScreen',
      params: { chapter },
    });
  };

  React.useEffect(() => {
    breakingDistanceRepository.getBreakingDistanceInfo(setBreakingDistanceInfo);
  }, []);

  return (
    <View style={styles.container}>
      {breakingDistanceInfo && (
        <>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{breakingDistanceInfo.title}</Text>
            <Text style={styles.headerSubTitle}>
              {breakingDistanceInfo.explanation}
            </Text>
          </View>
          <View style={styles.calculatorContainer}>
            <TextInput
              style={styles.input}
              onChangeText={text => onChangeNumber(text)}
              value={number}
              keyboardType="numeric"
            />
          </View>
          <ListItem
            onSubmit={navigateToRegulationHandle}
            iconFile={breakingDistanceInfo.iconFile}
            title="Bekijk regelgevingen"
            subTitle="TODO subtitle"
          />
          <View />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: breakingDistanceInfo.breakingDistanceImage }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default BreakingDistanceCalculatorScreen;
