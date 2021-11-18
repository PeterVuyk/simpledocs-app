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
    bottom: -5,
  },
  editIndicator: {
    color: globalStyle.color.secondary.dark,
  },
});

const HeaderLogo: FC = React.memo(() => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.headerLogo}
        source={require('../../../assets/images/company-logo.png')}
      />
      {!environment.isProduction() && (
        <View style={styles.nonProductionIndicatorContainer}>
          <Icon
            name="edit-3"
            style={styles.editIndicator}
            type="Feather"
            fontSize={globalStyle.icon.size.small}
          />
        </View>
      )}
    </View>
  );
});

export default HeaderLogo;
