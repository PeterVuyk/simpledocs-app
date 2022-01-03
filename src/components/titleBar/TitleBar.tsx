import React, { FC } from 'react';
import { Text, View, StyleSheet, Keyboard } from 'react-native';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.color.white,
    padding: 20,
  },
  bottomDivider: {
    borderBottomColor: globalStyle.color.default.light,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    ...globalStyle.typography.h1,
    textAlign: 'center',
    color: globalStyle.titleLayout.color,
    alignSelf: 'center',
  },
  headerSubTitle: {
    ...globalStyle.typography.h4,
    paddingTop: 20,
    textAlign: 'center',
  },
});

interface Props {
  title: string;
  subTitle?: string;
  bottomDivider?: boolean;
}

const TitleBar: FC<Props> = ({ title, subTitle, bottomDivider }) => {
  return (
    <View
      onTouchStart={Keyboard.dismiss}
      style={[
        styles.container,
        bottomDivider === true ? styles.bottomDivider : {},
      ]}
    >
      <Text style={styles.headerTitle}>{title}</Text>
      {subTitle !== undefined && (
        <Text style={styles.headerSubTitle}>{subTitle}</Text>
      )}
    </View>
  );
};

export default TitleBar;
