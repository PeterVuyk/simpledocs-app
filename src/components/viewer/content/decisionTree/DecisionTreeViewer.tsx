import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { DecisionTreeStep } from '../../../../model/decisionTree/DecisionTreeStep';
import globalStyle from '../../../../styling/globalStyle';
import { DecisionTree } from '../../../../model/decisionTree/DecisionTree';
import IntentContentPage from '../../../intent/IntentContentPage';
import ContentViewer from '../ContentViewer';
import { CONTENT_TYPE_HTML } from '../../../../model/ContentType';
import TitleBar from '../../../titleBar/TitleBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyle.color.white,
    flex: 1,
  },
  questionLabel: {
    ...globalStyle.typography.h3,
    textAlign: 'center',
    color: globalStyle.color.primary.main,
    marginBottom: 20,
  },
  question: {
    ...globalStyle.typography.h3,
    textAlign: 'center',
    color: globalStyle.color.primary.main,
    height: 200,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  contentContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  leftButtonStyle: {
    backgroundColor: 'red',
    width: 100,
  },
  rightButtonStyle: {
    backgroundColor: 'green',
    width: 100,
  },
});

interface Props {
  content: string;
  bookType: string;
}

const DecisionTreeViewer: FC<Props> = ({ content, bookType }) => {
  const [decisionTree, setDecisionTree] = useState<DecisionTree | null>(null);
  const [isRootQuestion, setRootQuestion] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<
    DecisionTreeStep | undefined
  >();
  const [leftStep, setLeftStep] = useState<DecisionTreeStep | undefined>();
  const [rightStep, setRightStep] = useState<DecisionTreeStep | undefined>();
  const isFocused = useIsFocused();

  useEffect(() => {
    // For now just to be sure we only want to set the calculations when the user first time opens the page.
    // If the user has a slow phone and a book contains a lot of calculations, decision trees and other heavy
    // components then the user experience could slow down.
    if (isFocused && !decisionTree) {
      setDecisionTree(JSON.parse(content));
    }
  }, [content, decisionTree, isFocused]);

  useEffect(() => {
    if (currentStep === undefined) {
      setCurrentStep(decisionTree?.steps[0]);
    }
    setLeftStep(
      decisionTree?.steps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel?.toLowerCase() === 'nee'),
    );
    setRightStep(
      decisionTree?.steps
        .filter(value => value.parentId === currentStep?.id)
        .find(value => value.lineLabel?.toLowerCase() === 'ja'),
    );
    setRootQuestion(currentStep?.parentId === null);
  }, [currentStep, decisionTree]);

  const getPreviousQuestion = useCallback((): DecisionTreeStep | undefined => {
    return decisionTree?.steps.find(step => step.id === currentStep?.parentId);
  }, [currentStep, decisionTree]);

  if (decisionTree?.steps.length === 0) {
    return <IntentContentPage />;
  }

  return (
    <ScrollView style={styles.container}>
      <TitleBar title={decisionTree?.title ?? ''} />
      <Text style={styles.questionLabel}>
        {decisionTree?.steps.find(value => value.parentId === currentStep?.id)
          ? 'Vraag:'
          : 'Antwoord:'}
      </Text>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.question}>{currentStep?.label}</Text>
        <View
          style={[
            {
              opacity: isRootQuestion ? 0 : 1,
              flexDirection: 'row',
            },
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
        {leftStep !== undefined && rightStep !== undefined && (
          <View style={[styles.buttonContainer]}>
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
      {currentStep !== undefined && currentStep.content && (
        <ContentViewer
          content={currentStep.content}
          contentType={currentStep.contentType ?? CONTENT_TYPE_HTML}
          bookType={bookType}
        />
      )}
    </ScrollView>
  );
};

export default DecisionTreeViewer;
