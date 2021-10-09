import React, { FC } from 'react';
import { Text, View, StyleSheet, Keyboard } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 20,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#154594',
    alignSelf: 'center',
  },
  headerSubTitle: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 15,
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
