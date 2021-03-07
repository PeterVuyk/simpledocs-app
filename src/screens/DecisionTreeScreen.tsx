import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DecisionTreeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>DecisionTreeScreen</Text>
      <Button
        onPress={() =>
          navigation.navigate('RegulationDetailsScreen', {
            regulationChapter: 6,
          })
        }
        title="test open article"
        accessibilityLabel="click me"
      />
    </View>
  );
};

export default DecisionTreeScreen;
