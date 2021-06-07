import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import regulationRepository, {
  Regulation,
} from '../../database/repository/regulationRepository';
import ListItem from '../../components/ListItem';
import versioningRepository, {
  Versioning,
} from '../../database/repository/versioningRepository';
import internetConnectivity from '../../helper/internetConnectivity';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const RegulationsScreen: React.FC<Props> = ({ navigation }) => {
  const [regulations, setRegulations] = React.useState<Regulation[]>([]);
  const [versions, setVersions] = React.useState<Versioning[]>([]);

  const isStartupSuccessful = useCallback(() => {
    const isDatabaseSuccessfullyInitialized = !versions.some(
      version => version.aggregate === 'initial',
    );
    if (!internetConnectivity.hasInternetConnection()) {
      // TODO: Add alert
      // If no contains 'initial'? Then show alert something like: 'De app performt het beste met internet, zo ontvang je van ons de laatst gewijzigde artikelen en worden de afbeeldingen goed weergegeven'.
    }
    return isDatabaseSuccessfullyInitialized;
  }, [versions]);

  React.useEffect(() => {
    if (!isStartupSuccessful()) {
      // TODO: show full screen message: Internet nodig, zet je internet aan (met button 'try again').
    }
    regulationRepository.getParagraphs(setRegulations);
  }, [isStartupSuccessful, versions]);

  React.useEffect(() => {
    versioningRepository.getAllVersions(setVersions);
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
