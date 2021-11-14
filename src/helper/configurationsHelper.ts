import { Versioning } from '../model/SystemConfigurations';
import configurationsStorage from '../storage/configurationsStorage';
import { AppConfigurations } from '../model/AppConfigurations';
import logger from '../util/logger';

const updateVersioning = async (aggregate: string, versioning: Versioning) => {
  const config = await configurationsStorage.getSystemConfiguration();
  config!.versions[aggregate] = versioning;
  await configurationsStorage
    .storeSystemConfiguration(config!)
    .catch(reason =>
      logger.error(
        `store systemConfiguration failed for 'updateVersioning' aggregate: ${aggregate}, aggregate won't be shown in the UI. Will try again next startup app`,
        reason,
      ),
    );
};

const updateConfigurations = async (appConfig: AppConfigurations) => {
  let systemConfig = await configurationsStorage.getSystemConfiguration();
  if (!systemConfig) {
    systemConfig = {
      versions: {},
      appConfigurations: appConfig,
    };
  }
  systemConfig.appConfigurations = appConfig;
  await configurationsStorage.storeSystemConfiguration(systemConfig);
  return systemConfig;
};

/**
 * Because it is highly unlikely that systemConfig is not available,
 * and we don't want to do everywhere extra checks; we accept to use '!' in this function.
 */
const createSessionConfiguration = async () => {
  const systemConfig = await configurationsStorage.getSystemConfiguration();
  const removedVersions = Object.keys(systemConfig!.versions).filter(
    value => systemConfig!.appConfigurations?.versioning[value] === undefined,
  );
  removedVersions.forEach(version => {
    delete systemConfig!.versions[version];
  });

  const validateConfigPredicate = (aggregate: string) => {
    const aggregateExists = systemConfig!.versions[aggregate] !== undefined;
    if (!aggregateExists) {
      logger.debugMessage(
        `the app won't show aggregate '${aggregate}' to the user because it was in the 'appConfigurations' but not in the appConfiguration version-list`,
      );
    }
    return aggregateExists;
  };

  systemConfig!.appConfigurations!.firstTab.bookTypes =
    systemConfig!.appConfigurations!.firstTab.bookTypes.filter(value =>
      validateConfigPredicate(value.bookType),
    );
  systemConfig!.appConfigurations!.secondTab.bookTypes =
    systemConfig!.appConfigurations!.secondTab.bookTypes.filter(value =>
      validateConfigPredicate(value.bookType),
    );
  systemConfig!.appConfigurations!.decisionsTab.indexDecisionType =
    systemConfig!.appConfigurations!.decisionsTab.indexDecisionType.filter(
      value => validateConfigPredicate(value),
    );
  await configurationsStorage.storeSystemConfiguration(systemConfig!);
};

/**
 * Because it is highly unlikely that systemConfig is not available,
 * and we don't want to do everywhere extra checks; we accept to use '!' in this function.
 */
const isStartupSuccessful = async (): Promise<boolean> => {
  const systemConfig = await configurationsStorage.getSystemConfiguration();
  if (!systemConfig || !systemConfig.appConfigurations) {
    logger.errorFromMessage(
      'isStartupSuccessful is called but returned false because systemConfig retrieved from storage is undefined',
    );
    return false;
  }

  const numberOfAggregatesFirstTab =
    systemConfig.appConfigurations.firstTab.bookTypes.length;
  const numberOfAggregatesSecondTab =
    systemConfig.appConfigurations.secondTab.bookTypes.length;
  const numberOfAggregatesDecisionTab =
    systemConfig.appConfigurations.decisionsTab.indexDecisionType.length;
  if (
    numberOfAggregatesFirstTab === 0 &&
    numberOfAggregatesSecondTab === 0 &&
    numberOfAggregatesDecisionTab === 0
  ) {
    logger.errorFromMessage(
      `isStartupSuccessful called but returned 'failed' because all tabs are empty. numberOfAggregatesFirstTab: ${numberOfAggregatesFirstTab}, numberOfAggregatesSecondTab: ${numberOfAggregatesSecondTab}, numberOfAggregatesDecisionTab: ${numberOfAggregatesDecisionTab}`,
    );
    return false;
  }
  return true;
};

const configurationsHelper = {
  updateVersioning,
  updateConfigurations,
  createSessionConfiguration,
  isStartupSuccessful,
};

export default configurationsHelper;
