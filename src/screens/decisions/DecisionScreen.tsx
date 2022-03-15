import React, { FC } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { AGGREGATE_DECISION_TREE } from '../../model/aggregate';
import { DecisionType } from '../../model/DecisionType';
import DecisionTreeScreen from './decisionTree/DecisionTreeScreen';
import ScreenContainer from '../../components/ScreenContainer';

interface Props {
  navigation: DrawerNavigationProp<any>;
  route: RouteProp<
    {
      params: {
        title: string;
        aggregate: DecisionType;
      };
    },
    'params'
  >;
}

const DecisionScreen: FC<Props> = ({ navigation, route }) => {
  const { title, aggregate } = route.params;

  return (
    <ScreenContainer>
      {aggregate === AGGREGATE_DECISION_TREE && (
        <DecisionTreeScreen title={title} navigation={navigation} />
      )}
    </ScreenContainer>
  );
};
export default DecisionScreen;
