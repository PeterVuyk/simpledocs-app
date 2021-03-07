import React from 'react';
import { Linking, Image, View, FlatList, BackHandler } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Block, Text } from 'expo-ui-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Animated from 'react-native-reanimated';
import { getDrawerProgressListener } from './onDrawerProgressListener';

interface Props {
  progress: Animated.Node<number>;
  navigation: DrawerNavigationHelpers;
}

const DrawerContent: React.FC<Props> = ({ progress, navigation }) => {
  const [titles, setTitle] = React.useState([
    {
      chapter: 1,
      title: 'Verkeerskennis',
      paragraphs: {
        '1.1': { title: 'Snelheid, stopafstand en inhalen', subParagraphs: {} },
        '1.2': { title: 'Wegenverkeerswet', subParagraphs: {} },
        '1.3': {
          title: 'Persoonlijke- en voertuigdocumenten',
          subParagraphs: {},
        },
      },
    },
    {
      chapter: 2,
      title: 'Beroepsspecifieke verkeerskennis',
      paragraphs: {
        '2.1': {
          title: 'Voertuigen binnen de Ambulancezorg onderscheiden',
          subParagraphs: {},
        },
        '2.2': { title: 'Urgentie indeling', subParagraphs: {} },
        '2.3': {
          title: 'Wettelijke bepalingen en ontheffingen/vrijstellingen',
          subParagraphs: {},
        },
        '2.4': {
          title: 'Risico en het gebruik van ontheffingen en vrijstellingen',
          subParagraphs: {
            '2.4.1': { title: 'Risico (in het verkeer)' },
            '2.4.2': { title: 'Rijden met OGS' },
            '2.4.3': { title: 'Rijden zonder OGS' },
          },
        },
      },
    },
    {
      chapter: 3,
      title:
        'Brancherichtlijn Optische en Geluidsignalen Spoedeisende medische hulpverlening',
      paragraphs: {
        '3.1': { title: 'Inleiding', subParagraphs: {} },
        '3.2': { title: 'Toepassingsbereik', subParagraphs: {} },
        '3.3': { title: 'Omschrijving ‘dringende taak’', subParagraphs: {} },
        '3.4': {
          title: 'Prioriteitstelling meldingen',
          subParagraphs: {
            '3.4.1': { title: 'Zorgindicatie en urgentiebepaling' },
            '3.4.2': {
              title:
                'Urgentiebepaling en het voeren van Optische nen Geluidssignalen',
            },
          },
        },
        '3.5': {
          title: 'Gedragscode bestuurder van voorrangsvoertuigen',
          subParagraphs: {
            '3.5.1': { title: 'Algemeen' },
            '3.5.2': { title: 'Het rijden door rood licht' },
            '3.5.3': { title: 'Maximumsnelheden' },
            '3.5.4': { title: 'Tegen het verkeer inrijden' },
            '3.5.5': { title: 'Plaats op de weg bij files' },
            '3.5.6': {
              title: 'De duur van het gebruik van optische en geluidssignalen',
            },
            '3.5.7': {
              title:
                'Het gebruik van de optische en geluidssignalen door voertuigen voor de spoedeisende medische hulpverlening',
            },
            '3.5.8': { title: 'Buitenland' },
          },
        },
        '3.6': { title: 'Opleiding en bevoegdheid', subParagraphs: {} },
        '3.7': { title: 'Inwerkingtreding en evaluatie', subParagraphs: {} },
      },
    },
    {
      chapter: 4,
      title: 'Bewust autorijden',
      paragraphs: {
        '4.1': { title: 'Verkeersinzicht', subParagraphs: {} },
        '4.2': {
          title: 'Voertuigkennis',
          subParagraphs: {
            '4.2.1': {
              title: 'Voertuigcontrole en algemene richtlijnen bij een rit',
            },
            '4.2.2': { title: 'Voertuigdynamica' },
            '4.2.3': { title: 'Voertuigveiligheidssystemen' },
          },
        },
        '4.3': {
          title: 'Duurzaam veilig, mobiliteit en milieu',
          subParagraphs: {},
        },
      },
    },
    {
      chapter: 5,
      title: 'Veiligheid',
      paragraphs: {
        '5.1': { title: 'Incidentmanagement', subParagraphs: {} },
        '5.2': {
          title: 'Overige specifieke veiligheidsrisico’s',
          subParagraphs: {
            '5.2.1': { title: 'Veiligheidsrisico’s airbag' },
            '5.2.2': { title: 'Gevaarlijke stoffen' },
            '5.2.3': { title: 'Schema gordelplicht' },
          },
        },
      },
    },
    {
      chapter: 6,
      title: 'Bijlagen',
      paragraphs: {
        '6.1': {
          title: 'Reglement Verkeersregels en Verkeerstekens (RVV) 1990',
          subParagraphs: {},
        },
        '6.2': {
          title: 'Verkeersborden en aanwijzingen',
          subParagraphs: {
            '6.2.1': { title: 'Verkeersborden' },
            '6.2.2': { title: 'Aanwijzingen' },
          },
        },
        '6.3': {
          title: 'Regeling Optische- en Geluidssignalen 1-3-2009',
          subParagraphs: {},
        },
        '6.4': {
          title:
            'Geraadpleegde bronnen en verklarende woordenlijst Aantekeningen',
          subParagraphs: {},
        },
      },
    },
  ]);

  React.useEffect(() => {
    if (getDrawerProgressListener()) {
      getDrawerProgressListener()(progress);
    }
  }, [progress]);

  return (
    <Block>
      <Block flex={0.4} margin={20} marginBottom={0} bottom>
        <Image
          source={require('../../../assets/images/azn.png')}
          style={{
            height: 40,
            resizeMode: 'contain',
            marginLeft: -65,
            marginBottom: 10,
          }}
        />
        <Text style={{ color: '#4c4c4c', fontSize: 16 }}>
          Inhoudsopgave regelgeving
        </Text>
      </Block>
      <Block>
        <FlatList
          data={titles}
          keyExtractor={item => item.chapter.toString()}
          renderItem={({ item }) => (
            <DrawerItem
              style={{ marginBottom: -5 }}
              label={() => (
                <View style={{ flexDirection: 'row', marginLeft: 3 }}>
                  <Text
                    style={{ color: '#4c4c4c', fontSize: 14, marginRight: 24 }}
                  >
                    §{item.chapter && `${item.chapter}. `}
                  </Text>
                  <Text style={{ color: '#4c4c4c', fontSize: 14 }}>
                    {item.title}
                  </Text>
                </View>
              )}
              onPress={(): void => {
                navigation.navigate('DecisionTree');
              }}
            />
          )}
        />
      </Block>
      <DrawerItem
        style={{
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1,
          marginBottom: -5,
        }}
        label="Help"
        onPress={() => Linking.openURL('https://www.ambulancezorg.nl/contact')}
        icon={({ color }) => (
          <MaterialCommunityIcons name="help" color={color} size={20} />
        )}
      />
      <DrawerItem
        style={{ marginBottom: -5 }}
        label="Afsluiten"
        onPress={(): void => {
          BackHandler.exitApp();
        }}
        icon={({ color }) => (
          <MaterialCommunityIcons
            name="exit-to-app"
            color={color}
            size={20}
            style={{ transform: [{ rotateY: '180deg' }] }}
          />
        )}
      />
    </Block>
  );
};

export default DrawerContent;
