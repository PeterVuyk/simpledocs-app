import * as React from 'react';
import { Image } from 'react-native';

const LogoHeader: React.FC = () => {
  return (
    <Image
      style={{ width: 200, resizeMode: 'contain' }}
      /* eslint-disable-next-line global-require */
      source={require('../../../assets/images/azn.png')}
    />
  );
};

export default LogoHeader;
