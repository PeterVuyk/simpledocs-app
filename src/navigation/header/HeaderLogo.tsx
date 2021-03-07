import * as React from 'react';
import { Image } from 'react-native';

const HeaderLogo: React.FC = () => {
  return (
    <Image
      style={{ width: 200, resizeMode: 'contain' }}
      source={require('../../../assets/images/azn.png')}
    />
  );
};

export default HeaderLogo;
