import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import decisionTreeRepository, {
  DecisionTreeStep,
} from '../../database/repository/decisionTreeRepository';

interface Props {
  navigation: any;
  route: RouteProp<
    {
      params: {
        title: string;
      };
    },
    'params'
  >;
}

const styles = StyleSheet.create({
  question: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#154594',
    fontSize: 21,
  },
  buttonContainer: {
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
    paddingRight: 20,
    paddingBottom: 200,
  },
  regulationsButtonsStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#154594',
  },
  leftButtonStyle: {
    backgroundColor: 'red',
    marginRight: 5,
    flex: 1,
    width: 100,
  },
  rightButtonStyle: {
    backgroundColor: 'green',
    marginLeft: 5,
    flex: 1,
    width: 100,
  },
});

const DecisionTreeScreen: React.FC<Props> = ({ route, navigation }) => {
  const [isRootQuestion, setRootQuestion] = useState<boolean>(true);
  const [currentStep, setCurrentStep] =
    useState<DecisionTreeStep | undefined>();
  const [leftStep, setLeftStep] = useState<DecisionTreeStep | undefined>();
  const [rightStep, setRightStep] = useState<DecisionTreeStep | undefined>();
  const [decisionTreeSteps, setDecisionTreeSteps] = useState<
    DecisionTreeStep[]
  >([]);

  React.useEffect(() => {
    const { title } = route.params;
    decisionTreeRepository.getDecisionTreeByTitle(title, setDecisionTreeSteps);
  }, [route]);

  React.useEffect(() => {
    if (currentStep === undefined) {
      setCurrentStep(decisionTreeSteps[0]);
    }
    setLeftStep(
      decisionTreeSteps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel?.toLowerCase() === 'nee'),
    );
    setRightStep(
      decisionTreeSteps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel?.toLowerCase() === 'ja'),
    );
    setRootQuestion(currentStep?.parentId === null);
  }, [currentStep, decisionTreeSteps]);

  const getPreviousQuestion = (): DecisionTreeStep | undefined => {
    return decisionTreeSteps.find(step => step.id === currentStep?.parentId);
  };

  return (
    <View style={styles.container}>
      {decisionTreeSteps.length !== 0 && (
        <View style={styles.contentContainerStyle}>
          <Text style={styles.question}>{currentStep?.label}</Text>
          {!isRootQuestion && (
            <View
              style={[
                { bottom: 120, flexDirection: 'row' },
                styles.buttonContainer,
              ]}
            >
              <Icon
                color="#154594"
                name="keyboard-backspace"
                type="MaterialCommunityIcons"
                onPress={() => setCurrentStep(getPreviousQuestion())}
                reverse
              />
              <Icon
                color="#154594"
                name="restore"
                type="MaterialCommunityIcons"
                onPress={() => setCurrentStep(undefined)}
                reverse
              />
            </View>
          )}
          {currentStep !== undefined && currentStep.regulationChapter !== null && (
            <View style={[{ bottom: 60 }, styles.buttonContainer]}>
              <Button
                buttonStyle={[styles.regulationsButtonsStyle]}
                title="Open regelgeving"
                onPress={() => {
                  navigation.navigate('DecisionTreeDocumentationScreen', {
                    regulationChapter: currentStep.regulationChapter,
                  });
                }}
              />
            </View>
          )}
          {leftStep !== undefined && rightStep !== undefined && (
            <View
              style={[
                {
                  bottom: 60,
                  flexDirection: 'row',
                },
                styles.buttonContainer,
              ]}
            >
              <Button
                buttonStyle={[styles.leftButtonStyle]}
                onPress={() => setCurrentStep(leftStep)}
                title="Nee"
              />
              <Button
                buttonStyle={[styles.rightButtonStyle]}
                onPress={() => setCurrentStep(rightStep)}
                title="Ja"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default DecisionTreeScreen;
