import React, { FC } from 'react';
import { Text, View, StyleSheet, Keyboard } from 'react-native';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.color.white,
    margin: 20,
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
}

const TitleBar: FC<Props> = ({ title, subTitle }) => {
  return (
    <View onTouchStart={Keyboard.dismiss} style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subTitle !== undefined && (
        <Text style={styles.headerSubTitle}>{subTitle}</Text>
      )}
    </View>
  );
};

export default TitleBar;
