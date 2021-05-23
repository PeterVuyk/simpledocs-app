import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import decisionTreeRepository, {
  Title,
} from '../../database/repository/decisionTreeRepository';
import ListItem from '../../components/ListItem';
import breakingDistanceRepository, {
  BreakingDistanceInfo,
} from '../../database/repository/breakingDistanceRepository';

interface Props {
  navigation: any;
}

interface DecisionItem {
  title: string;
  iconFile: string;
  categorization: string;
}

const DecisionsScreen: React.FC<Props> = ({ navigation }) => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [decisionItems, setDecisionItems] = useState<DecisionItem[]>([]);
  const [breakingDistanceInfo, setBreakingDistanceInfo] =
    useState<BreakingDistanceInfo | null>(null);

  React.useEffect(() => {
    decisionTreeRepository.getDecisionTreeTitles(setTitles);
    breakingDistanceRepository.getBreakingDistanceInfo(setBreakingDistanceInfo);
  }, []);

  React.useEffect(() => {
    if (titles.length === 0 || breakingDistanceInfo === null) {
      return;
    }
    const decisionTrees = titles.map(title => {
      return { categorization: 'decisionTree', ...title } as DecisionItem;
    });
    setDecisionItems([
      {
        title: breakingDistanceInfo.title,
        iconFile: breakingDistanceInfo.iconFile,
        categorization: 'calculations',
      },
      ...decisionTrees,
    ]);
  }, [titles, breakingDistanceInfo]);

  const navigateDecisionTree = (decisionItem: DecisionItem) => {
    if (decisionItem.categorization === 'calculations') {
      navigation.navigate('BreakingDistanceCalculatorScreen');
      return;
    }
    navigation.navigate('DecisionsScreenStack', {
      screen: 'DecisionTreeScreen',
      params: { title: decisionItem.title },
    });
  };

  const flatListHeader = () => {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: '#fff',
        }}
      >
        <Text
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            color: '#154594',
            alignSelf: 'center',
            paddingTop: 30,
          }}
        >
          Besluitvormingsproces
        </Text>
        <Text style={{ paddingTop: 20, textAlign: 'center', fontSize: 15 }}>
          Vergemakkelijk het maken van keuzes in het verkeer door verschillende
          opties in regelgevingen tegen elkaar af te wegen.
        </Text>
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
