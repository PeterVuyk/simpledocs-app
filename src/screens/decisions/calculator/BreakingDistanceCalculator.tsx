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

const BreakingDistanceCalculator: FC = () => {
  const [textInput, setTextInput] = useState<number | undefined>();

  const getTextInputValue = () =>
    textInput === undefined ? '' : textInput?.toString();

  const calculateBreakingDistance = (kmPerHour: number): string => {
    if (kmPerHour < 30 || kmPerHour > 160) {
      return '';
    }
    const responseTimeDistance = (kmPerHour / 10) * 3;
    const stopDistance = ((kmPerHour / 10) * (kmPerHour / 10)) / 2;
    const breakingDistance = +(responseTimeDistance + stopDistance).toFixed(2);
    return `${breakingDistance} meter`;
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
        {calculateBreakingDistance(textInput ?? 0)}
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

export default BreakingDistanceCalculator;
