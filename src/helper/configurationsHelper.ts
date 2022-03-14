import { Versioning } from '../model/configurations/SystemConfigurations';
import configurationsStorage from '../storage/configurationsStorage';
import { AppConfigurations } from '../model/configurations/AppConfigurations';
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

  systemConfig!.appConfigurations!.firstBookTab.bookTypes =
    systemConfig!.appConfigurations!.firstBookTab.bookTypes.filter(value =>
      validateConfigPredicate(value.bookType),
    );
  systemConfig!.appConfigurations!.secondBookTab.bookTypes =
    systemConfig!.appConfigurations!.secondBookTab.bookTypes.filter(value =>
      validateConfigPredicate(value.bookType),
    );
  systemConfig!.appConfigurations!.thirdBookTab.bookTypes =
    systemConfig!.appConfigurations!.thirdBookTab.bookTypes.filter(value =>
      validateConfigPredicate(value.bookType),
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

  const numberOfAggregatesFirstBookTab =
    systemConfig.appConfigurations.firstBookTab.bookTypes.length;
  const numberOfAggregatesSecondBookTab =
    systemConfig.appConfigurations.secondBookTab.bookTypes.length;
  const numberOfAggregatesThirdBookTab =
    systemConfig.appConfigurations.thirdBookTab.bookTypes.length;
  if (
    numberOfAggregatesFirstBookTab === 0 &&
    numberOfAggregatesSecondBookTab === 0 &&
    numberOfAggregatesThirdBookTab === 0
  ) {
    logger.errorFromMessage(
      `isStartupSuccessful called but returned 'failed' because all tabs are empty. numberOfAggregatesFirstBookTab: ${numberOfAggregatesFirstBookTab}, numberOfAggregatesSecondBookTab: ${numberOfAggregatesSecondBookTab}, numberOfAggregatesThirdBookTab: ${numberOfAggregatesThirdBookTab}`,
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
