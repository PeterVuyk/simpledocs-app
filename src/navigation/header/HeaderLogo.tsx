import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import environment from '../../util/environment';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  headerLogo: {
    height: 45,
    width: 'auto',
    resizeMode: 'contain',
  },
  nonProductionIndicatorContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  editIndicator: {
    color: globalStyle.color.secondary.dark,
    fontSize: globalStyle.typography.h1.fontSize,
  },
});

const HeaderLogo: FC = React.memo(() => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.headerLogo}
        source={require('../../../assets/company-logo.png')}
      />
      {!environment.isProduction() && (
        <View style={styles.nonProductionIndicatorContainer}>
          <Icon name="edit-3" style={styles.editIndicator} type="Feather" />
        </View>
      )}
    </View>
  );
});

export default HeaderLogo;
