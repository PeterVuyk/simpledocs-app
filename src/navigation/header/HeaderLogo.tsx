import * as React from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';

const HeaderLogo: React.FC = () => {
  return (
    <View
      style={{
        marginTop: 10,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.ambulancezorg.nl/')}
        style={{ flex: 1 }}
      >
        <Image
          style={{
            width: 200,
            resizeMode: 'contain',
          }}
          source={require('../../../assets/images/azn.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLogo;
