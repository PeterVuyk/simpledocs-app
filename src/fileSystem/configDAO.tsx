import * as FileSystem from 'expo-file-system';
import { ConfigInfo } from '../model/ConfigInfo';

let config: ConfigInfo | undefined;

const getConfigFromFileStorage = (): ConfigInfo => {
  return {
    defaultArticleTypeSearch: 'instructionManual',
    firstTab: {
      bottomTab: {
        familyType: 'SimpleLineIcons',
        icon: 'graduation',
        title: 'Handboek',
      },
      articleTypes: [
        {
          index: 0,
          articleType: 'instructionManual',
          title: 'Handboek',
        },
      ],
    },
    secondTab: {
      bottomTab: {
        familyType: 'MaterialCommunityIcons',
        icon: 'book-open-outline',
        title: 'Regelgeving',
      },
      title: 'Regelgevingen',
      subTitle:
        'Hieronder zie je een viertal opties met bla die we regelgevingen noemen, todo eddie graag mij doorgeven welke tekst je hier zou willen hebben staan.',
      articleTypes: [
        {
          index: 0,
          articleType: 'ontheffingGoedeTaakuitoefening',
          title: 'Ontheffing goede taakuitoefening',
          subTitle: 'Over bla en bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
        {
          index: 1,
          articleType: 'brancherichtlijnMedischeHulpverlening',
          title: 'Brancherichtlijn medische hulpverlening',
          subTitle: 'Over bla die bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
        {
          index: 2,
          articleType: 'regelingOGS2009',
          title: 'Regeling OGS 2009',
          subTitle: 'Over bla die bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
        {
          index: 3,
          articleType: 'RVV1990',
          title: 'RVV 1990',
          subTitle: 'Ja bla die bla',
          iconFile:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNTZhYWZmIiBkPSJNMjgsNUg0QTMsMywwLDAsMCwxLDhWMjNhMSwxLDAsMCwwLDEuNzQuNjdsOC4xNS05LjA4LDUuNiw4LjA5YTEsMSwwLDAsMCwxLjQzLjIybDYtNC41OSw1LjM4LDUuNDdBMSwxLDAsMCwwLDMxLDIzLjFWOEEzLDMsMCwwLDAsMjgsNVoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMzAuNzEsMjIuNGwtNi02LjFhMSwxLDAsMCwwLTEuMzItLjA5bC02LjY4LDUuMTNhMSwxLDAsMCwwLS4yMSwxLjM2bDIuNjgsMy44N0ExLDEsMCwwLDAsMjAsMjdoOGEzLDMsMCwwLDAsMy0zdi0uOUExLDEsMCwwLDAsMzAuNzEsMjIuNFoiLz48cGF0aCBmaWxsPSIjMDQ3OGVkIiBkPSJNMjAuODIsMjUuNDNsLTktMTNhMSwxLDAsMCwwLTEuNTctLjFsLTksMTBBMSwxLDAsMCwwLDEsMjN2MWEzLDMsMCwwLDAsMywzSDIwYTEsMSwwLDAsMCwuODItMS41N1oiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjEyIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        },
      ],
    },
  };
};

const getConfig = (): ConfigInfo => {
  if (config === undefined) {
    config = getConfigFromFileStorage();
  }
  return config;
};

const configDir = `${FileSystem.documentDirectory}/`;

// TODO: Implement:
// const example = async () => {

//   await collectConfig
//     .getConfig()
//     .then(value => JSON.stringify(value))
//     .then(value => saveConfiguration(value, 'appConfig.json'));

//   await getConfiguration('appConfig.json')
//     .then(r => console.log(JSON.parse(r)))
//     .catch(console.log);

// };

export async function saveConfiguration(
  configFile: string,
  configFilename: string,
): Promise<void> {
  await FileSystem.writeAsStringAsync(configDir + configFilename, configFile);
}

export async function getConfiguration(configFile: string): Promise<string> {
  return FileSystem.readAsStringAsync(configDir + configFile, {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

const configDAO = {
  getConfig,
};

export default configDAO;
