import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import environment from '../../util/environment';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerLogo: {
    resizeMode: 'contain',
    width: '100%',
    height: 60,
  },
  nonProductionIndicatorContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  editIndicator: {
    color: globalStyle.color.default.dark,
    fontSize: globalStyle.typography.h1.fontSize,
  },
});

const HeaderLogo: FC = React.memo(() => {
  return (
    <View style={styles.container}>
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
