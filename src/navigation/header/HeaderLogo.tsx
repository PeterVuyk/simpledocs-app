import * as React from 'react';
import { Image } from 'react-native';

const HeaderLogo: React.FC = () => {
  return (
    <Image
      style={{
        marginTop: 10,
        width: 200,
        resizeMode: 'contain',
        alignItems: 'center',
      }}
      source={require('../../../assets/images/azn.png')}
    />
  );
};

export default HeaderLogo;
