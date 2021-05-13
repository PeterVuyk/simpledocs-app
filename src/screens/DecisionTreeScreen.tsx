import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text, Button, Icon, Content, H3 } from 'native-base';
import decisionTreeRepository, {
  DecisionTreeStep,
} from '../database/repository/decisionTreeRepository';

interface Props {
  navigation: any;
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    flex: 1,
  },
  question: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#154594',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 15,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 30,
    paddingBottom: 200,
  },
});

const DecisionTreeScreen: React.FC<Props> = ({ navigation }) => {
  const [isRootQuestion, setRootQuestion] = React.useState<boolean>(true);
  const [currentStep, setCurrentStep] =
    React.useState<DecisionTreeStep | undefined>();
  const [leftStep, setLeftStep] =
    React.useState<DecisionTreeStep | undefined>();
  const [rightStep, setRightStep] =
    React.useState<DecisionTreeStep | undefined>();
  const [decisionTreeSteps, setDecisionTreeSteps] = React.useState<
    DecisionTreeStep[]
  >([]);
  const { width } = Dimensions.get('window');

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
    setRootQuestion(currentStep?.parentId === null);
  }, [currentStep, decisionTreeSteps]);

  const getPreviousQuestion = (): DecisionTreeStep | undefined => {
    return decisionTreeSteps.find(step => step.id === currentStep?.parentId);
  };

  return (
    <View style={styles.container}>
      {decisionTreeSteps.length !== 0 && (
        <Content contentContainerStyle={styles.contentContainerStyle}>
          <H3 style={styles.question}>{currentStep?.label}</H3>
          <View style={[{ bottom: 115 }, styles.buttonContainer]}>
            <Button
              disabled={isRootQuestion}
              onPress={() => setCurrentStep(getPreviousQuestion())}
            >
              <Icon name="keyboard-backspace" type="MaterialCommunityIcons" />
            </Button>
            <Button
              disabled={isRootQuestion}
              onPress={() => setCurrentStep(undefined)}
            >
              <Icon name="restore" type="MaterialCommunityIcons" />
            </Button>
          </View>
          {currentStep !== undefined && currentStep.regulationChapter !== null && (
            <View style={[{ bottom: 50 }, styles.buttonContainer]}>
              <Button
                style={{ width: width - 30 }}
                iconRight
                onPress={() =>
                  navigation.navigate('RegulationsScreenStack', {
                    screen: 'RegulationDetailsScreen',
                    params: {
                      regulationChapter: currentStep.regulationChapter,
                    },
                  })
                }
              >
                <Text uppercase={false} style={styles.buttonText}>
                  Open regelgeving
                </Text>
              </Button>
            </View>
          )}
          {leftStep !== undefined && rightStep !== undefined && (
            <View style={[{ bottom: 50 }, styles.buttonContainer]}>
              <Button
                style={{ backgroundColor: 'red', width: 125 }}
                onPress={() => setCurrentStep(leftStep)}
              >
                <Text uppercase={false} style={styles.buttonText}>
                  Nee
                </Text>
              </Button>
              <Button
                style={{ backgroundColor: 'green', width: 125 }}
                onPress={() => setCurrentStep(rightStep)}
              >
                <Text uppercase={false} style={styles.buttonText}>
                  Ja
                </Text>
              </Button>
            </View>
          )}
        </Content>
      )}
    </View>
  );
};

export default DecisionTreeScreen;
