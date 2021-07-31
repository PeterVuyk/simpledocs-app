import * as FileSystem from 'expo-file-system';
import { ConfigInfo } from '../model/ConfigInfo';

let config: ConfigInfo | undefined;

const configDir = `${FileSystem.documentDirectory}/`;

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

const appConfigExistsInFileStorage = async (): Promise<boolean> => {
  const info = await FileSystem.getInfoAsync(`${configDir}appConfig.json`);
  return info.exists;
};

const getAppConfigFromFileStorage = async (): Promise<ConfigInfo> => {
  return JSON.parse(await getConfiguration('appConfig.json')) as ConfigInfo;
};

const saveAppConfigToFileStorage = (configInfo: ConfigInfo) => {
  return saveConfiguration(JSON.stringify(configInfo), 'appConfig.json');
};

const getAppConfig = async (): Promise<ConfigInfo> => {
  if (config === undefined) {
    config = await getAppConfigFromFileStorage();
  }
  return config;
};

const appConfigDAO = {
  getAppConfig,
  saveAppConfigToFileStorage,
  appConfigExistsInFileStorage,
};

export default appConfigDAO;
