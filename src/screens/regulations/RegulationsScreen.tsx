import React from 'react';
import { FlatList, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import ListItem from '../../components/ListItem';
import { Article } from '../../database/entity/Article';
import articleRepository from '../../database/repository/articleRepository';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const RegulationsScreen: React.FC<Props> = ({ navigation }) => {
  const [regulations, setRegulations] = React.useState<Article[]>([]);

  React.useEffect(() => {
    articleRepository.getParagraphs(setRegulations);
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: 60, backgroundColor: '#fff' }}>
      {regulations && (
        <FlatList
          keyExtractor={item => item.chapter.toString()}
          data={regulations}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.subTitle}
              iconFile={item.iconFile}
              onSubmit={() =>
                navigation.navigate('RegulationsScreenStack', {
                  screen: 'RegulationDetailsScreen',
                  params: { regulationChapter: item.chapter },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default RegulationsScreen;
