import * as React from 'react';
import { Image } from 'react-native';

const LogoHeader: React.FC = () => {
  return (
    <Image
      style={{ width: 200, resizeMode: 'contain' }}
      source={{
        uri:
          'https://www.ambulancezorg.nl/public/images/ambulancezorg-nederland-logo.svg',
      }}
      // TODO: Require from assets: source={require('../../assets/azn.png')}
    />
  );
};

export default LogoHeader;
