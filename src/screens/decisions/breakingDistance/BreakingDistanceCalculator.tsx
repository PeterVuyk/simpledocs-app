import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import breakingDistanceAlgorithm from './breakingDistanceAlgorithm';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  headerSubTitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const BreakingDistanceCalculator: React.FC = () => {
  const [textInput, setTextInput] = useState<number | undefined>();

  return (
    <View style={styles.container}>
      <Text
        style={[
          { color: textInput ? '#154594' : '#fff' },
          styles.headerSubTitle,
        ]}
      >
        Stopafstand: {breakingDistanceAlgorithm.calculate(textInput)} meter
      </Text>
      <TextInput
        label="Snelheid in KM"
        value={textInput?.toString()}
        keyboardType="numeric"
        mode="outlined"
        theme={{ colors: { primary: '#154594' } }}
        underlineColor="green"
        onChangeText={(updatedText: string) => {
          if (!Number.isNaN(Number(updatedText))) {
            setTextInput(
              Number(updatedText) === 0 ? undefined : Number(updatedText),
            );
          }
        }}
      />
    </View>
  );
};

export default BreakingDistanceCalculator;
