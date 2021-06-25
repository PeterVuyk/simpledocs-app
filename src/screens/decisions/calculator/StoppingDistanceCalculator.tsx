import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

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

const StoppingDistanceCalculator: FC = () => {
  const [textInput, setTextInput] = useState<number | undefined>();

  const getTextInputValue = () =>
    textInput === undefined ? '' : textInput?.toString();

  const calculateBrakingDistance = (kmPerHour: number): string => {
    if (kmPerHour < 30 || kmPerHour > 160) {
      return '';
    }
    const reactionDistance = (kmPerHour / 10) * 3;
    const brakingDistance = ((kmPerHour / 10) * (kmPerHour / 10)) / 2;
    const stoppingDistance = +(reactionDistance + brakingDistance).toFixed(2);
    return `${stoppingDistance} meter`;
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            color: textInput === undefined ? '#fff' : '#154594',
          },
          styles.headerSubTitle,
        ]}
      >
        {calculateBrakingDistance(textInput ?? 0)}
      </Text>
      <TextInput
        label="Snelheid in KM (30 t/m 160)"
        value={getTextInputValue()}
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

export default StoppingDistanceCalculator;
