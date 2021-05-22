import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import decisionTreeRepository, {
  Title,
} from '../../database/repository/decisionTreeRepository';
import SVGIcon from '../../components/SVGIcon';

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

  React.useEffect(() => {
    decisionTreeRepository.getDecisionTreeTitles(setTitles);
  }, []);

  const getCalculations = (): DecisionItem[] => {
    return [
      {
        title: 'Remafstand berekenen',
        iconFile:
          'data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTEuODU0IDUxMS44NTQiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTExLjg1NCA1MTEuODU0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxlbGxpcHNlIGN4PSIyMjEuMjU3IiBjeT0iMTc3LjE1MiIgZmlsbD0iI2VhZjBmMCIgcng9Ijk5LjMwMiIgcnk9Ijk5LjMwMiIgdHJhbnNmb3JtPSJtYXRyaXgoLjcwNyAtLjcwNyAuNzA3IC43MDcgLTYwLjQ2MSAyMDguMzM5KSIvPjwvZz48Zz48cGF0aCBkPSJtMTguMjQ3IDM4MC4xNjJjLTEwLjgyNy0xMS4yMTYtMTEuMTc1LTI5LjM0NyAwLTQwLjUyMWw2OS4xMjQtNjkuMTI0IDQwLjUyMSA0MC41MjEtNjkuMTI0IDY5LjEyNGMtMTEuMTkgMTEuMTktMjkuMzMyIDExLjE5LTQwLjUyMSAweiIgZmlsbD0iI2ZmN2U5NiIvPjwvZz48Zz48cGF0aCBkPSJtNDAyLjk2MSA0NS42NnY0MjAuNTNoLTEzMy4zNjV2LTIwMi4yNmM3LjgzOC00LjM3MyAxNS4yMTEtOS44OTggMjEuODc3LTE2LjU2NSAyNC4yMzEtMjQuMjMxIDMzLjMzMS01Ny44NjUgMjcuMjcxLTg5LjE1Ni0zLjYyNi0xOC43NzYtMTIuNzE2LTM2LjcxNS0yNy4yNzEtNTEuMjctLjAzLS4wMy0uMDcxLS4wNzEtLjEwMS0uMTAxLTYuNjM2LTYuNjE2LTEzLjk3OS0xMi4xMS0yMS43NzYtMTYuNDY0di00NC43MTR6IiBmaWxsPSIjZmZjZTYyIi8+PC9nPjxnPjxwYXRoIGQ9Im0yNjkuNTk2IDI2My45MnYyMDIuMjcxaC05NS4wMzV2LTIwMS4zODJjOC4zMzMgNC40NTQgMTcuMTcxIDcuNjE2IDI2LjIxMSA5LjUxNSAxNC41MDQgMy4wNSAyOS41NDQgMi44MjggNDMuOTU3LS42NjcgOC41OTUtMi4wODEgMTYuOTY4LTUuMzMzIDI0Ljg2Ny05LjczN3oiIGZpbGw9IiMwMGQ1ZjUiLz48L2c+PGc+PHBhdGggZD0ibTQwMi45NjEgMTU4LjIwOWg5OC44OTN2MzA3Ljk4NWgtOTguODkzeiIgZmlsbD0iI2VhZjBmMCIvPjwvZz48Zz48cGF0aCBkPSJtNDAyLjk2MSAyMjMuMTIzaDk4Ljg5M3YxODEuMDc5aC05OC44OTN6IiBmaWxsPSIjZmY3ZTk2Ii8+PC9nPjxnPjxwYXRoIGQ9Im0yNjkuNTk2IDM1Mi44NDFoMTMzLjM2NnY1MS4zNjFoLTEzMy4zNjZ6IiBmaWxsPSIjZWFmMGYwIi8+PC9nPjxnPjxwYXRoIGQ9Im00MDIuOTYxIDEwNi44Mzl2NTEuMzcxaC04NC4yMTdjLTMuNjI2LTE4Ljc3Ni0xMi43MTYtMzYuNzE1LTI3LjI3MS01MS4yNy0uMDMtLjAzLS4wNzEtLjA3MS0uMTAxLS4xMDF6IiBmaWxsPSIjZWFmMGYwIi8+PC9nPjxnPjxwYXRoIGQ9Im0yNDQuNzI4IDE0OC4yMXYxMjUuNDQ3Yy0xNC40MTMgMy40OTUtMjkuNDUzIDMuNzE3LTQzLjk1Ny42Njd2LTEyNi4xMTR6IiBmaWxsPSIjMDBkNWY1Ii8+PC9nPjxnPjxwYXRoIGQ9Im01MDEuODU0IDE0OC4yMDloLTg4Ljg5M3YtMTAyLjU0OWMwLTUuNTIzLTQuNDc4LTEwLTEwLTEwaC0xMzMuMzY1Yy01LjUyMiAwLTEwIDQuNDc3LTEwIDEwdjI5LjA4Yy0xMi4wOTktNC41MjMtMjUuMDM2LTYuODkxLTM4LjMzOS02Ljg5MS0yOS4xOTUgMC01Ni42NDQgMTEuMzctNzcuMjg4IDMyLjAxNC0yMC42NDUgMjAuNjQ1LTMyLjAxNCA0OC4wOTMtMzIuMDE0IDc3LjI4OSAwIDI1LjgzNiA4LjkwOSA1MC4zIDI1LjI2NSA2OS44OTVsLTI5LjU4OSAyOS41ODgtMTMuMTg5LTEzLjE4OWMtMy44NTYtMy44NTQtMTAuMjg3LTMuODU0LTE0LjE0MyAwbC02OS4xMjMgNjkuMTI0Yy0xNC44OTUgMTQuODk1LTE0LjkwNyAzOS43NTkuMDAxIDU0LjY2NCAxNC44NzcgMTQuODkgMzkuNzc0IDE0Ljg4OCA1NC42NjMgMGw2OS4xMjMtNjkuMTI0YzMuOTA1LTMuOTA1IDMuOTA1LTEwLjIzNyAwLTE0LjE0MmwtMTMuMTg5LTEzLjE4OSAyOS41ODktMjkuNTg4YzQuMTg4IDMuNDk2IDguNTk5IDYuNjUyIDEzLjE5OCA5LjQ1M3YxODUuNTQ5aC03Mi41M2MtNS41MjIgMC0xMCA0LjQ3Ny0xMCAxMHM0LjQ3OCAxMCAxMCAxMGw0MDkuODIzLjAwM2M1LjUyMiAwIDEwLTQuNDc3IDEwLTEwdi0xMDUuMDdjMC01LjUyMy00LjQ3OC0xMC0xMC0xMHMtMTAgNC40NzctMTAgMTB2MzMuMDc4aC03OC44OTN2LTE2MS4wODFoNzguODkzdjM5LjE4MWMwIDUuNTIzIDQuNDc4IDEwIDEwIDEwczEwLTQuNDc3IDEwLTEwdi0xMTQuMDk1YzAtNS41MjMtNC40NzctMTAtMTAtMTB6bS00NTAuMTU2IDIyNC44ODJjLTcuMDcyIDcuMDctMTkuMjQ1IDcuMTM2LTI2LjM4MSAwLTcuMTMtNy4xMy03LjE0NS0xOS4yMzMuMDAxLTI2LjM3OWw2Mi4wNTItNjIuMDUzIDI2LjM4IDI2LjM3OXptMTgzLjAzLTEwNy42NThjLTcuOTIxIDEuMTkzLTE2LjAwMSAxLjMxMi0yMy45NTcuMzkxdi0xMDcuNjE0aDIzLjk1N3ptNDQuODY4IDQuMTk2YzM0LTIxLjU0MSA1My44NDEtNjEuMjQ4IDUwLjU5OC0xMDEuNDJoNjIuNzY4djE3NC42MzJoLTExMy4zNjZ6bTExMy4zNjYtMTIxLjQyaC02Ni4yNTljLTMuMDM5LTExLjE0Mi03LjgzNy0yMS43MTEtMTQuMjU0LTMxLjM3MWg4MC41MTN6bS0xMTMuMzY2IDIxNC42MzJoMTEzLjM2NnYzMS4zNjFoLTExMy4zNjZ6bTAtMzA3LjE4MWgxMTMuMzY2djQxLjE3OGgtOTcuNTc0Yy00Ljg4NC00LjUxNi0xMC4xNzItOC42MDMtMTUuNzkyLTEyLjE2M3ptLTEyMS40ODUgNTguMzQ1YzE2Ljg2Ni0xNi44NjcgMzkuMjkyLTI2LjE1NiA2My4xNDYtMjYuMTU2IDQ3LjA2OSAwIDg2LjczNyAzNy43NjQgODkuMTcyIDg0LjU1IDIuMDI3IDM3LjY1NS0yMC44NzIgNzMuNDg0LTU1LjcgODcuNTU5di0xMTEuNzQ4YzAtNS41MjMtNC40NzgtMTAtMTAtMTBoLTQzLjk1N2MtNS41MjIgMC0xMCA0LjQ3Ny0xMCAxMHYxMTIuODk5Yy0zNC45MzItMTIuNjUtNTguODE2LTQ2LjgyOS01OC44MTYtODMuOTU3LS4wMDEtMjMuODUzIDkuMjg4LTQ2LjI3OSAyNi4xNTUtNjMuMTQ3em0yNi40NDkgMTY2LjE2M2M4LjgwNSAzLjEzIDE4LjA0IDUuMTE4IDI3LjUyMSA1LjkwMXYxMDcuNjI1YzAgNS41MjMgNC40NzggMTAgMTAgMTBzMTAtNC40NzcgMTAtMTB2LTEwNy43NjZjOS40OTQtLjkyNyAxOC43MjQtMy4wNzkgMjcuNTE0LTYuMzY1djE3Ni42MjhoLTc1LjAzNXptOTUuMDM2IDEzNC4wMzRoMTEzLjM2NnY0MS45ODloLTExMy4zNjZ6bTIxMi4yNTggMHY0MS45OTJoLTc4Ljg5M3YtNDEuOTkyem0tNzguODkyLTIwMS4wNzl2LTQ0LjkxNGg3OC44OTN2NDQuOTE0eiIvPjxwYXRoIGQ9Im01MTAuMTY0IDMxMC4zNTZjLTIuOTgzLTQuNTY0LTkuMzUxLTUuNzY5LTEzLjg1OS0yLjc3LTQuNTQyIDMuMDIyLTUuNzcxIDkuMzQxLTIuNzYxIDEzLjg3IDMuMDIgNC41NDMgOS4zMyA1Ljc2NSAxMy44NiAyLjc2IDQuNTQ0LTMuMDE1IDUuNzc4LTkuMzM3IDIuNzYtMTMuODZ6Ii8+PC9nPjwvZz48L3N2Zz4=',
        categorization: 'calculations',
      },
    ] as DecisionItem[];
  };

  React.useEffect(() => {
    const decisionTrees = titles.map(title => {
      return { categorization: 'decisionTree', ...title } as DecisionItem;
    });
    setDecisionItems([...getCalculations(), ...decisionTrees]);
  }, [titles]);

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
          elevation: 1,
          width: '100%',
          padding: 20,
          marginBottom: 5,
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

  const renderItem = (item: DecisionItem) => (
    <ListItem
      bottomDivider
      style={{
        marginBottom: 10,
      }}
      onPress={() => navigateDecisionTree(item)}
    >
      <SVGIcon iconBlob={item.iconFile} />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>
          {getSubtitleFromCategorization(item.categorization)}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#fff' }}>
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

export default DecisionsScreen;
