import React, { FC } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
  ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
  ARTICLE_TYPE_REGELING_OGS_2009,
  ARTICLE_TYPE_RVV_1990,
  ArticleType,
} from '../../../model/ArticleType';
import TitleBar from '../../../components/TitleBar';
import ListItem from '../../../components/ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
});

interface Props {
  navigation: DrawerNavigationProp<any>;
}

interface RegulationArticle {
  articleType: ArticleType;
  title: string;
  subTitle: string;
  iconFile: string;
}

const RegulationArticlesScreen: FC<Props> = ({ navigation }) => {
  const regulations: RegulationArticle[] = [
    {
      articleType: ARTICLE_TYPE_ONTHEFFING_GOEDE_TAAKUITVOERING,
      title: 'Ontheffing goede taakuitoefening',
      subTitle: 'Over bla en bla',
      iconFile:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
    },
    {
      articleType: ARTICLE_TYPE_BRANCHE_RICHTLIJN_MEDISCHE_HULPVERLENING,
      title: 'Brancherichtlijn medische hulpverlening',
      subTitle: 'Over bla die bla',
      iconFile:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
    },
    {
      articleType: ARTICLE_TYPE_REGELING_OGS_2009,
      title: 'Regeling OGS 2009',
      subTitle: 'Over bla die bla',
      iconFile:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
    },
    {
      articleType: ARTICLE_TYPE_RVV_1990,
      title: 'RVV 1990',
      subTitle: 'Ja bla die bla',
      iconFile:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
    },
  ];

  return (
    <View style={styles.container}>
      <TitleBar
        title="Regelgevingen"
        subTitle="Hieronder zie je een viertal opties met bla die we regelgevingen noemen, todo eddie graag mij doorgeven welke tekst je hier zou willen hebben staan."
      />
      <FlatList
        keyExtractor={item => item.articleType.toString()}
        data={regulations}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.subTitle}
            iconFile={item.iconFile}
            onSubmit={() => {
              navigation.navigate('RegulationsScreenStack', {
                screen: 'RegulationsScreen',
                params: { articleType: item.articleType },
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default RegulationArticlesScreen;
