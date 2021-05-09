import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import decisionTreeRepository, {
  DecisionTreeStep,
} from '../database/repository/decisionTreeRepository';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: any;
}

const DecisionTreeScreen: React.FC<Props> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = React.useState<
    DecisionTreeStep | undefined
  >();
  const [leftStep, setLeftStep] = React.useState<
    DecisionTreeStep | undefined
  >();
  const [rightStep, setRightStep] = React.useState<
    DecisionTreeStep | undefined
  >();
  const [decisionTreeSteps, setDecisionTreeSteps] = React.useState<
    DecisionTreeStep[]
  >([]);

  React.useEffect(() => {
    decisionTreeRepository.getDecisionTreeSteps(setDecisionTreeSteps);
  }, []);

  React.useEffect(() => {
    if (currentStep === undefined) {
      setCurrentStep(decisionTreeSteps[0]);
    }
    setLeftStep(
      decisionTreeSteps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel === 'Nee'),
    );
    setRightStep(
      decisionTreeSteps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel === 'Ja'),
    );
  }, [currentStep, decisionTreeSteps]);

  const isRootQuestion = (): boolean => currentStep?.parentId === null;

  return (
    <View style={styles.container}>
      {decisionTreeSteps.length !== 0 && (
        <View>
          <Text h4>{currentStep?.label}</Text>
          <View style={{ flex: 1 }}>
            {leftStep !== undefined && (
              <Button onPress={() => setCurrentStep(leftStep)} title="Nee" />
            )}
            {!isRootQuestion() && (
              <Icon
                onPress={() => setCurrentStep(undefined)}
                reverse
                name="restore"
                type="material-community"
                color="#0091EA"
              />
            )}
            {rightStep !== undefined && (
              <Button onPress={() => setCurrentStep(rightStep)} title="Ja" />
            )}
            {currentStep !== undefined &&
              currentStep.regulationChapter !== null && (
                <Button
                  onPress={() =>
                    navigation.navigate('RegulationsScreenStack', {
                      screen: 'RegulationDetailsScreen',
                      params: {
                        regulationChapter: currentStep.regulationChapter,
                      },
                    })
                  }
                  title="test open article"
                  accessibilityLabel="click me"
                />
              )}
          </View>
        </View>
      )}
    </View>
  );
};

export default DecisionTreeScreen;
