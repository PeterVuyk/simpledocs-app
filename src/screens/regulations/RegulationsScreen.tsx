import React from 'react';
import { FlatList, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import regulationRepository, {
  Regulation,
} from '../../database/repository/regulationRepository';
import SVGIcon from '../../components/SVGIcon';
import ListItem from '../../components/ListItem';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const RegulationsScreen: React.FC<Props> = ({ navigation }) => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);

  React.useEffect(() => {
    regulationRepository.getParagraphs(setRegulations);
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
                navigation.navigate('RegulationDetailsScreen', {
                  regulationChapter: item.chapter,
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
