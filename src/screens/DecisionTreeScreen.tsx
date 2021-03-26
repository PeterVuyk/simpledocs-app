import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const DecisionTreeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>DecisionTreeScreen</Text>
      <Button
        onPress={() =>
          navigation.navigate('RegulationsScreenStack', {
            screen: 'RegulationDetailsScreen',
            params: { regulationChapter: '1' },
          })
        }
        title="test open article"
        accessibilityLabel="click me"
      />
    </View>
  );
};

export default DecisionTreeScreen;
