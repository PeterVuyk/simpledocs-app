import { useState } from 'react';
import synchronizeDatabase from './synchronizeDatabase';
import {
  AGGREGATE_CALCULATIONS,
  AGGREGATE_DECISION_TREE,
} from '../../model/aggregate';
import logger from '../../helper/logger';
import { SystemConfigurations } from '../../model/SystemConfigurations';
import configurationsDAO from '../../configurations/configurationsDAO';
import appConfigurationsClient from '../../api/appConfigurationsClient';
import environment from '../../util/environment';
import configHelper from '../../helper/configHelper';
import { STAGING_ENVIRONMENT } from '../../model/Environment';

function useUpdateAggregates() {
  const [isAggregatesUpdated, setIsAggregatesUpdated] = useState<
    null | boolean
  >(null);
  const updateCalculations = async (
    systemConfig: SystemConfigurations,
  ): Promise<void> => {
    if (
      Object.keys(systemConfig.appConfigurations!.versioning).includes(
        AGGREGATE_CALCULATIONS,
      )
    ) {
      await synchronizeDatabase.updateCalculationsIfNewVersion(
        systemConfig.appConfigurations!.versioning[AGGREGATE_CALCULATIONS]
          .version,
        systemConfig,
      );
    }
  };

  const updateDecisionTree = async (
    systemConfig: SystemConfigurations,
  ): Promise<void> => {
    if (
      Object.keys(systemConfig.appConfigurations!.versioning).includes(
        AGGREGATE_DECISION_TREE,
      )
    ) {
      await synchronizeDatabase.updateDecisionTreeIfNewVersion(
        systemConfig.appConfigurations!.versioning[AGGREGATE_DECISION_TREE]
          .version,
        systemConfig,
      );
    }
  };

  const updateAggregates = async () => {
    if (isAggregatesUpdated !== null) {
      return;
    }
    let appConfig = await appConfigurationsClient
      .getAppConfigurations()
      .catch(reason =>
        logger.error(
          'Tried to get appConfigurations from the server api but failed, updateAggregates skipped',
          reason,
        ),
      );
    if (!appConfig) {
      setIsAggregatesUpdated(true);
      return;
    }

    if (environment.getEnvironment().envName === STAGING_ENVIRONMENT) {
      appConfig = configHelper.overWriteVersions(appConfig);
    }
    setIsAggregatesUpdated(false);
    const configurations = await configurationsDAO.getConfigurations(appConfig);
    await updateDecisionTree(configurations)
      .then(() => updateCalculations(configurations))
      .then(() => synchronizeDatabase.updateBooksIfNewVersion(configurations))
      .then(configurationsDAO.createSessionConfiguration)
      .catch(reason => {
        logger.error(
          'something when wrong by update aggregates, some or all updates may be skipped',
          reason,
        );
      });
    setIsAggregatesUpdated(true);
  };
  return { isAggregatesUpdated, updateAggregates };
}

export default useUpdateAggregates;
