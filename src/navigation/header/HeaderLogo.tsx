import * as React from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';

const HeaderLogo: React.FC = () => {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL('https://www.ambulancezorg.nl/')}
      style={{ flex: 1, flexGrow: 1 }}
    >
      <Image
        style={{
          height: 45,
          width: 'auto',
          resizeMode: 'contain',
        }}
        source={require('../../../assets/images/azn.png')}
      />
    </TouchableOpacity>
  );
};

export default HeaderLogo;
