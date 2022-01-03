import React, { FC } from 'react';
import { Spinner } from 'native-base';
import { View } from 'react-native';
import globalStyle from '../styling/globalStyle';

const LoadingSpinner: FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Spinner
        style={{ justifyContent: 'center', alignItems: 'center' }}
        color={globalStyle.color.primary.light}
      />
    </View>
  );
};

export default LoadingSpinner;
