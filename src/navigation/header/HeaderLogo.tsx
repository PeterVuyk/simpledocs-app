import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  headerLogo: {
    height: 45,
    width: 'auto',
    resizeMode: 'contain',
  },
});

const HeaderLogo: FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.headerLogo}
        source={require('../../../assets/images/company-logo.png')}
      />
    </View>
  );
};

export default HeaderLogo;
