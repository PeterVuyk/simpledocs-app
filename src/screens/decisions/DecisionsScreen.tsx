import React, { FC, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import decisionTreeRepository from '../../database/repository/decisionTreeRepository';
import ListItem from '../../components/ListItem';
import calculationsRepository from '../../database/repository/calculationsRepository';
import TitleBar from '../../components/TitleBar';
import { CalculationInfo } from '../../model/CalculationInfo';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../model/Versioning';
import { DecisionTreeTitle } from '../../model/DecisionTreeTitle';

interface Props {
  navigation: any;
}

interface DecisionItem {
  title: string;
  iconFile: string;
  categorization: string;
}

const DecisionsScreen: FC<Props> = ({ navigation }) => {
  const [decisionTreeTitles, setDecisionTreeTitles] = useState<
    DecisionTreeTitle[]
  >([]);
  const [calculationTitles, setCalculationTitles] = useState<CalculationInfo[]>(
    [],
  );
  const [decisionItems, setDecisionItems] = useState<DecisionItem[]>([]);

  useEffect(() => {
    decisionTreeRepository.getDecisionTrees(setDecisionTreeTitles);
    calculationsRepository.getCalculationsInfo(setCalculationTitles);
  }, []);

  useEffect(() => {
    if (decisionTreeTitles.length === 0 || calculationTitles.length === 0) {
      return;
    }
    const decisionTrees = decisionTreeTitles.map(title => {
      return {
        categorization: AGGREGATE_DECISION_TREE,
        ...title,
      } as DecisionItem;
    });
    const calculations = calculationTitles.map(calculation => {
      return {
        title: calculation.title,
        iconFile: calculation.iconFile,
        categorization: AGGREGATE_CALCULATIONS,
      } as DecisionItem;
    });
    setDecisionItems([...decisionTrees, ...calculations]);
  }, [decisionTreeTitles, calculationTitles]);

  const navigateDecisionItem = (decisionItem: DecisionItem) => {
    if (decisionItem.categorization === AGGREGATE_CALCULATIONS) {
      navigation.navigate('DecisionsScreenStack', {
        screen: 'calculatorScreen',
        params: { title: decisionItem.title },
      });
      return;
    }
    navigation.navigate('DecisionsScreenStack', {
      screen: 'DecisionTreeScreen',
      params: { title: decisionItem.title },
    });
  };

  const flatListHeader = () => {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <TitleBar
          title="Besluitvormingsproces"
          subTitle="Vergemakkelijk het maken van keuzes in het verkeer door verschillende
          opties in regelgevingen tegen elkaar af te wegen."
        />
      </View>
    );
  };

  const getSubtitleFromCategorization = (category: string) => {
    switch (category) {
      case AGGREGATE_DECISION_TREE:
        return 'Beslisboom';
      case AGGREGATE_CALCULATIONS:
        return 'Berekeningen';
      default:
        return '';
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#fff' }}>
      {decisionItems.length !== 0 && (
        <FlatList
          keyExtractor={item => item.title}
          data={decisionItems}
          ListHeaderComponent={flatListHeader}
          renderItem={({ item }) => (
            <ListItem
              onSubmit={() => navigateDecisionItem(item)}
              iconFile={item.iconFile}
              title={item.title}
              subTitle={getSubtitleFromCategorization(item.categorization)}
            />
          )}
        />
      )}
    </View>
  );
};

export default DecisionsScreen;
