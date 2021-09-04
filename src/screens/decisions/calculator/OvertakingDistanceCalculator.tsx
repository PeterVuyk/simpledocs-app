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

const OvertakingDistanceCalculator: FC = () => {
  const [ownSpeed, setOwnSpeed] = useState<number | undefined>();
  const [vehicleInFrontSpeed, setVehicleInFrontSpeed] = useState<
    number | undefined
  >();

  const getOwnSpeed = () =>
    ownSpeed === undefined ? '' : ownSpeed?.toString();

  const getVehicleInFrontSpeed = () =>
    vehicleInFrontSpeed === undefined ? '' : vehicleInFrontSpeed?.toString();

  const calculateOvertakingDistance = (
    ownSpeedVal: number,
    vehicleInFrontSpeedVal: number,
  ): string => {
    if (
      ownSpeedVal < 30 ||
      ownSpeedVal > 160 ||
      vehicleInFrontSpeedVal < 20 ||
      vehicleInFrontSpeedVal > 150
    ) {
      return '';
    }
    if (ownSpeedVal <= vehicleInFrontSpeedVal) {
      return 'Geef voor je eigen snelheid een hogere snelheid op dan het voertuig voor je.';
    }

    const distance = 60;
    const speedDifference = ownSpeedVal - vehicleInFrontSpeedVal;
    const overtakingDistance = (ownSpeedVal * distance) / speedDifference;
    return `${overtakingDistance} meter`;
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            color: ownSpeed === undefined ? '#fff' : '#154594',
          },
          styles.headerSubTitle,
        ]}
      >
        {calculateOvertakingDistance(ownSpeed ?? 0, vehicleInFrontSpeed ?? 0)}
      </Text>
      <TextInput
        label="Eigen snelheid in KM (30 t/m 160)"
        value={getOwnSpeed()}
        keyboardType="numeric"
        mode="outlined"
        theme={{ colors: { primary: '#154594' } }}
        underlineColor="green"
        onChangeText={(updatedText: string) => {
          if (!Number.isNaN(Number(updatedText))) {
            setOwnSpeed(
              Number(updatedText) === 0 ? undefined : Number(updatedText),
            );
          }
        }}
      />
      <TextInput
        style={{ marginTop: 5 }}
        label="Snelheid voorligger in KM (20 t/m 150)"
        value={getVehicleInFrontSpeed()}
        keyboardType="numeric"
        mode="outlined"
        theme={{ colors: { primary: '#154594' } }}
        underlineColor="green"
        onChangeText={(updatedText: string) => {
          if (!Number.isNaN(Number(updatedText))) {
            setVehicleInFrontSpeed(
              Number(updatedText) === 0 ? undefined : Number(updatedText),
            );
          }
        }}
      />
    </View>
  );
};

export default OvertakingDistanceCalculator;
