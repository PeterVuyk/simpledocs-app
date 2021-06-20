import * as React from 'react';
import { Image, View } from 'react-native';
import { FC } from 'react';

const HeaderLogo: FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          height: 45,
          width: 'auto',
          resizeMode: 'contain',
        }}
        source={require('../../../assets/images/azn.png')}
      />
    </View>
  );
};

export default HeaderLogo;
