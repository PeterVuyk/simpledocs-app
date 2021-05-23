import React, { useState } from 'react';
import { Image, Text, TextInput, View, StyleSheet, Button } from 'react-native';
import breakingDistanceRepository, {
  BreakingDistanceInfo,
} from '../../database/repository/breakingDistanceRepository';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const BreakingDistanceCalculatorScreen: React.FC = () => {
  const [number, onChangeNumber] = React.useState<number>(0);
  const [breakingDistanceInfo, setBreakingDistanceInfo] =
    useState<BreakingDistanceInfo | null>(null);

  React.useEffect(() => {
    breakingDistanceRepository.getBreakingDistanceInfo(setBreakingDistanceInfo);
  }, []);

  return (
    <>
      <View>
        <Text>Remafstand berekenen</Text>
        {/* 1: titel */}
        {/* 2: toelichting */}
        {/* 3: link naar regulationChapter */}
        <Text>
          De remafstand wordt bepaald door reactietijd en de stopafstand.
        </Text>
      </View>
      <Image source={require('../../../assets/images/azn.png')} />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeNumber(text)}
          value={number}
          keyboardType="numeric"
        />
        <Text>Resultaat</Text>
        <Button
          onPress={() => console.log('open documentation')}
          title="Bekijk regelgevingen"
        />
      </View>
    </>
  );
};

export default BreakingDistanceCalculatorScreen;
