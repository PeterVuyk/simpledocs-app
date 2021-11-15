import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#fff',
  },
  headerTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#154594',
  },
});

interface Props {
  title: string;
}

const SectionTitleBar: FC<Props> = ({ title }) => {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.headerTitle}>{title}:</Text>
    </View>
  );
};

export default SectionTitleBar;
