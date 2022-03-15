import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import decisionTreeRepository from '../../database/repository/decisionTreeRepository';
import ListItem from '../../components/listItem/ListItem';
import TitleBar from '../../components/titleBar/TitleBar';
import { AGGREGATE_DECISION_TREE } from '../../model/aggregate';
import { DecisionTreeTitle } from '../../model/decisionTree/DecisionTreeTitle';
import {
  DecisionsTab,
  BookTabInfo,
} from '../../model/configurations/AppConfigurations';
import logger from '../../util/logger';
import globalStyle from '../../styling/globalStyle';

interface Props {
  navigation: DrawerNavigationProp<any>;
  route: RouteProp<
    {
      params: {
        bookTabInfo: BookTabInfo;
        decisionTabInfo: DecisionsTab;
      };
    },
    'params'
  >;
}

interface DecisionItem {
  title: string;
  iconFile: string;
  aggregate: string;
}

const DecisionsOverviewScreen: FC<Props> = ({ navigation, route }) => {
  const [decisionTreeTitles, setDecisionTreeTitles] = useState<
    DecisionTreeTitle[] | null
  >(null);
  const [decisionItems, setDecisionItems] = useState<DecisionItem[]>([]);
  const { decisionTabInfo } = route.params;

  useEffect(() => {
    // Only add decision tree if enabled
    if (decisionTabInfo.indexDecisionType.includes(AGGREGATE_DECISION_TREE)) {
      decisionTreeRepository.getDecisionTrees(setDecisionTreeTitles);
    } else {
      setDecisionTreeTitles([]);
    }
  }, [decisionTabInfo.indexDecisionType]);

  useEffect(() => {
    if (decisionTreeTitles === null) {
      return;
    }
    let result: DecisionItem[] = [];
    for (const shiftKey of decisionTabInfo.indexDecisionType) {
      if (
        shiftKey === AGGREGATE_DECISION_TREE &&
        decisionTreeTitles.length !== 0
      ) {
        result = result.concat(
          decisionTreeTitles.map(title => {
            return {
              aggregate: AGGREGATE_DECISION_TREE,
              ...title,
            } as DecisionItem;
          }),
        );
      }
    }
    if (result.length === 0) {
      logger.errorFromMessage(
        `No pages are configured for the decision tab, config: ${JSON.stringify(
          decisionTabInfo.indexDecisionType,
        )}`,
      );
    }
    setDecisionItems(result);
  }, [decisionTreeTitles, decisionTabInfo.indexDecisionType, decisionTabInfo]);

  const navigateDecisionItem = useCallback(
    (decisionItem: DecisionItem) => {
      navigation.navigate('DecisionsScreenStack', {
        screen: 'DecisionScreen',
        params: {
          title: decisionItem.title,
          aggregate: decisionItem.aggregate,
        },
      });
    },
    [navigation],
  );

  const flatListHeader = () => {
    return (
      <View style={{ backgroundColor: globalStyle.color.white }}>
        <TitleBar
          bottomDivider
          title={decisionTabInfo.title}
          subTitle={decisionTabInfo.subTitle}
        />
      </View>
    );
  };

  const getSubtitleFromAggregate = (category: string) => {
    switch (category) {
      case AGGREGATE_DECISION_TREE:
        return 'Beslisboom';
      default:
        return '';
    }
  };

  const renderItem = useCallback(
    (item: DecisionItem) => (
      <ListItem
        onSubmit={() => navigateDecisionItem(item)}
        iconFile={item.iconFile}
        title={item.title}
        bookmarked={false}
        subTitle={getSubtitleFromAggregate(item.aggregate)}
      />
    ),
    [navigateDecisionItem],
  );

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 60,
        backgroundColor: globalStyle.color.white,
      }}
    >
      {decisionItems.length !== 0 && (
        <FlatList
          keyExtractor={item => item.title}
          data={decisionItems}
          ListHeaderComponent={flatListHeader}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default DecisionsOverviewScreen;
