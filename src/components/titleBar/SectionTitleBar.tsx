import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.color.white,
  },
  headerTitle: {
    ...globalStyle.typography.h3,
    color: globalStyle.color.primary.main,
    padding: 10,
  },
});

interface Props {
  title: string;
}

const SectionTitleBar: FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}:</Text>
    </View>
  );
};

export default SectionTitleBar;
