import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import decisionTreeRepository from '../database/repository/decisionTreeRepository';

interface Props {
  navigation: any;
}

const DecisionTreeScreen: React.FC<Props> = ({ navigation }) => {
  const [titles, setTitles] = useState<string[]>([]);

  React.useEffect(() => {
    decisionTreeRepository.getDecisionTreeTitles(setTitles);
  }, []);

  const navigateDecisionTree = (title: string) => {
    navigation.navigate('DecisionTreeScreenStack', {
      screen: 'DecisionTreeScreen',
      params: { title },
    });
  };

  const flatListHeader = () => {
    return (
      <View
        style={{
          elevation: 1,
          width: '100%',
          padding: 15,
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

  const renderItem = (item: string) => (
    <ListItem
      bottomDivider
      style={{
        marginBottom: 10,
      }}
      onPress={() => navigateDecisionTree(item)}
    >
      <Avatar
        rounded
        source={{
          uri: 'https://www.ilovepdf.com/img/ilovepdf/social/en-US/imagepdf.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
        <ListItem.Subtitle>Beslisboom</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#fff' }}>
      {titles && (
        <FlatList
          keyExtractor={item => item}
          data={titles}
          ListHeaderComponent={flatListHeader}
          renderItem={({ item }) => renderItem(item)}
        />
      )}
    </View>
  );
};

export default DecisionTreeScreen;
