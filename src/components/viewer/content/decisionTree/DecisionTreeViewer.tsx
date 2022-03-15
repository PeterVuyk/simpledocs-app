import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { DecisionTreeStep } from '../../../../model/decisionTree/DecisionTreeStep';
import globalStyle from '../../../../styling/globalStyle';
import ScreenContainer from '../../../../components/ScreenContainer';
import { DecisionTree } from '../../../../model/decisionTree/DecisionTree';
import IntentContentPage from '../../../intent/IntentContentPage';
import ContentViewer from '../ContentViewer';
import { CONTENT_TYPE_HTML } from '../../../../model/ContentType';

const styles = StyleSheet.create({
  questionLabel: {
    ...globalStyle.typography.h3,
    textAlign: 'center',
    color: globalStyle.color.primary.dark,
    marginTop: 50,
  },
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
  container: {
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

  const navigateToBookPage = (step: DecisionTreeStep) => {
    console.log('todo');
    // navigation.navigate('DecisionsScreenStack', {
    //   screen: 'DocumentationScreen',
    //   params: { content: step.content, contentType: step.contentType },
    // });
  };

  if (decisionTree?.steps.length === 0) {
    return <IntentContentPage />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionLabel}>
        {currentStep !== undefined && currentStep.content
          ? 'Antwoord:'
          : 'Vraag:'}
      </Text>
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
          <ContentViewer
            content={currentStep.content}
            contentType={currentStep.contentType ?? CONTENT_TYPE_HTML}
            bookType={bookType}
          />
          // <View style={[{ bottom: 60 }, styles.buttonContainer]}>
          //   <Button
          //     buttonStyle={[styles.bookPageButtonsStyle]}
          //     title="Open toelichting"
          //     onPress={() => navigateToBookPage(currentStep)}
          //   />
          // </View>
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
    </View>
  );
};

export default DecisionTreeViewer;
