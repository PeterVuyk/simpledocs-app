import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  tabContainer: {
    margin: 10,
  },
  headerSubTitle: {
    ...globalStyle.typography.h3,
    textAlign: 'center',
  },
});

interface DistanceResult {
  reactionDistance: string;
  brakingDistance: string;
  stoppingDistance: string;
}

const StoppingDistanceCalculator: FC = () => {
  const [textInput, setTextInput] = useState<number | undefined>();

  const getTextInputValue = () =>
    textInput === undefined ? '' : textInput?.toString();

  const calculateStoppingDistance = useCallback(
    (kmPerHour: number): DistanceResult => {
      if (kmPerHour < 30 || kmPerHour > 180) {
        return {
          reactionDistance: '',
          brakingDistance: '',
          stoppingDistance: '',
        };
      }
      const reactionDistance = (kmPerHour / 10) * 3;
      const brakingDistance = ((kmPerHour / 10) * (kmPerHour / 10)) / 2;
      const stoppingDistance = +(reactionDistance + brakingDistance).toFixed(2);

      return {
        reactionDistance: `${reactionDistance.toFixed(2)} meter`,
        brakingDistance: `${brakingDistance.toFixed(2)} meter`,
        stoppingDistance: `${stoppingDistance} meter`,
      };
    },
    [],
  );

  return (
    <View style={styles.tabContainer}>
      <Text
        style={[
          {
            color:
              textInput === undefined
                ? globalStyle.color.white
                : globalStyle.color.primary.main,
          },
          styles.headerSubTitle,
        ]}
      >
        {`Reactieafstand: ${
          calculateStoppingDistance(textInput ?? 0).reactionDistance
        }\n`}
        {`Remafstand: ${
          calculateStoppingDistance(textInput ?? 0).brakingDistance
        }\n`}
        {`Totale stopafstand: ${
          calculateStoppingDistance(textInput ?? 0).stoppingDistance
        }\n`}
      </Text>
      <TextInput
        label="Snelheid in KM (30 t/m 180)"
        value={getTextInputValue()}
        keyboardType="numeric"
        mode="outlined"
        theme={{ colors: { primary: globalStyle.color.primary.main } }}
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
