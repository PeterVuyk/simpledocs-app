import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import decisionTreeRepository from '../../../database/repository/decisionTreeRepository';
import { DecisionTreeStep } from '../../../model/decisionTree/DecisionTreeStep';
import globalStyle from '../../../styling/globalStyle';

const styles = StyleSheet.create({
  question: {
    ...globalStyle.typography.h1,
    textAlign: 'center',
    color: globalStyle.color.primary.main,
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 15,
  },
  tabContainer: {
    backgroundColor: globalStyle.color.white,
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 200,
  },
  bookPageButtonsStyle: {
    alignSelf: 'stretch',
    backgroundColor: globalStyle.color.primary.main,
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

interface Props {
  title: string;
  navigation: any;
}

const DecisionTreeScreen: FC<Props> = ({ title, navigation }) => {
  const [isRootQuestion, setRootQuestion] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<
    DecisionTreeStep | undefined
  >();
  const [leftStep, setLeftStep] = useState<DecisionTreeStep | undefined>();
  const [rightStep, setRightStep] = useState<DecisionTreeStep | undefined>();
  const [decisionTreeSteps, setDecisionTreeSteps] = useState<
    DecisionTreeStep[]
  >([]);

  useEffect(() => {
    decisionTreeRepository.getDecisionTreeByTitle(title, setDecisionTreeSteps);
  }, [title]);

  useEffect(() => {
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

  const getPreviousQuestion = useCallback((): DecisionTreeStep | undefined => {
    return decisionTreeSteps.find(step => step.id === currentStep?.parentId);
  }, [currentStep, decisionTreeSteps]);

  const navigateToBookPage = (step: DecisionTreeStep) => {
    navigation.navigate('DecisionsScreenStack', {
      screen: 'DocumentationScreen',
      params: { content: step.content, contentType: step.contentType },
    });
  };

  return (
    <View style={styles.tabContainer}>
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
                color={globalStyle.color.primary.main}
                name="keyboard-backspace"
                type="MaterialCommunityIcons"
                disabled={getPreviousQuestion() === undefined}
                onPress={() => setCurrentStep(getPreviousQuestion())}
                reverse
              />
              <Icon
                color={globalStyle.color.primary.main}
                name="restore"
                type="MaterialCommunityIcons"
                disabled={getPreviousQuestion() === undefined}
                onPress={() => setCurrentStep(undefined)}
                reverse
              />
            </View>
          )}
          {currentStep !== undefined && currentStep.content && (
            <View style={[{ bottom: 60 }, styles.buttonContainer]}>
              <Button
                buttonStyle={[styles.bookPageButtonsStyle]}
                title="Open toelichting"
                onPress={() => navigateToBookPage(currentStep)}
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
