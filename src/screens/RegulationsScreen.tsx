import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import DocumentationViewScreen from './DocumentationViewScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RegulationsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>RegulationsScreen</Text>
      <Button
        onPress={event =>
          navigation.navigate('DocumentationViewScreen', {
            regulationsContentId: 6,
            searchText: "article",
          })
        }
        title="test open article"
        accessibilityLabel="click me"
      />
    </View>
  );
};

export default RegulationsScreen;
