import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { titleBarStyle } from './titleBar/TitleBar';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});

// Only support (yet) for warning, later when needed add support for info and error
interface Props {
  message: string;
  severity: 'warning'; // | 'info' | 'error';
}

const AlertBox: FC<Props> = ({ message, severity }) => {
  return (
    <View
      style={[
        {
          backgroundColor: severity === 'warning' ? '#f3ca45' : '#fff',
        },
        styles.container,
      ]}
    >
      <Text style={[titleBarStyle.headerSubTitle]}>{message}</Text>
    </View>
  );
};

export default AlertBox;
