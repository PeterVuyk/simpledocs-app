import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import decisionTreeRepository, {
  Title,
} from '../../database/repository/decisionTreeRepository';
import ListItem from '../../components/ListItem';
import calculationsRepository from '../../database/repository/calculationsRepository';
import TitleBar from '../../components/TitleBar';
import { CalculationInfo } from '../../database/entity/CalculationInfo';

interface Props {
  navigation: any;
}

interface DecisionItem {
  title: string;
  iconFile: string;
  categorization: string;
}

const DecisionsScreen: React.FC<Props> = ({ navigation }) => {
  const [decisionTreeTitles, setDecisionTreeTitles] = useState<Title[]>([]);
  const [calculationTitles, setCalculationTitles] = useState<CalculationInfo[]>(
    [],
  );
  const [decisionItems, setDecisionItems] = useState<DecisionItem[]>([]);

  React.useEffect(() => {
    decisionTreeRepository.getDecisionTreeTitles(setDecisionTreeTitles);
    calculationsRepository.getCalculationsInfo(setCalculationTitles);
  }, []);

  React.useEffect(() => {
    if (decisionTreeTitles.length === 0 || calculationTitles.length === 0) {
      return;
    }
    const decisionTrees = decisionTreeTitles.map(title => {
      return { categorization: 'decisionTree', ...title } as DecisionItem;
    });
    const calculations = calculationTitles.map(calculation => {
      return {
        title: calculation.title,
        iconFile: calculation.iconFile,
        categorization: 'calculations',
      } as DecisionItem;
    });
    setDecisionItems([...calculations, ...decisionTrees]);
  }, [decisionTreeTitles, calculationTitles]);

  const navigateDecisionTree = (decisionItem: DecisionItem) => {
    if (decisionItem.categorization === 'calculations') {
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
      case 'decisionTree':
        return 'Beslisboom';
      case 'calculations':
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
              onSubmit={() => navigateDecisionTree(item)}
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
