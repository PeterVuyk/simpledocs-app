import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
    padding: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 200,
  },
  buttonStyle: {
    borderRadius: 5,
  },
  regulationsButtonsStyle: {
    flexGrow: 1,
    flex: 1,
  },
  leftButtonStyle: {
    backgroundColor: 'red',
    marginRight: 5,
    flex: 1,
  },
  rightButtonStyle: {
    backgroundColor: 'green',
    marginLeft: 5,
    flex: 1,
  },
});

const DecisionTreeScreen: React.FC<Props> = ({ navigation }) => {
  const [isRootQuestion, setRootQuestion] = useState<boolean>(true);
  const [currentStep, setCurrentStep] =
    useState<DecisionTreeStep | undefined>();
  const [leftStep, setLeftStep] = useState<DecisionTreeStep | undefined>();
  const [rightStep, setRightStep] = useState<DecisionTreeStep | undefined>();
  const [decisionTreeSteps, setDecisionTreeSteps] = useState<
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
        .find(value => value.lineLabel.toLowerCase() === 'nee'),
    );
    setRightStep(
      decisionTreeSteps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel.toLowerCase() === 'ja'),
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
          {!isRootQuestion && (
            <View style={[{ bottom: 115 }, styles.buttonContainer]}>
              <Button
                style={styles.buttonStyle}
                onPress={() => setCurrentStep(getPreviousQuestion())}
              >
                <Icon name="keyboard-backspace" type="MaterialCommunityIcons" />
              </Button>
              <Button
                style={styles.buttonStyle}
                onPress={() => setCurrentStep(undefined)}
              >
                <Icon name="restore" type="MaterialCommunityIcons" />
              </Button>
            </View>
          )}
          {currentStep !== undefined && currentStep.regulationChapter !== null && (
            <View style={[{ bottom: 60 }, styles.buttonContainer]}>
              <Button
                style={[styles.buttonStyle, styles.regulationsButtonsStyle]}
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
            <View style={[{ bottom: 60 }, styles.buttonContainer]}>
              <Button
                style={[styles.buttonStyle, styles.leftButtonStyle]}
                onPress={() => setCurrentStep(leftStep)}
              >
                <Text uppercase={false} style={styles.buttonText}>
                  Nee
                </Text>
              </Button>
              <Button
                style={[styles.buttonStyle, styles.rightButtonStyle]}
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
