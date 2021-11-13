import React from 'react';
import migrationChangelogRepository from '../../repository/migrationChangelogRepository';
import { MigrationChangelog } from '../../../model/migrationChangelog';
import initializeRepository from './initializeRepository';
import logger from '../../../util/logger';
import SQLiteClient from '../../migrations/SQLiteClient';
import { useAppDispatch } from '../../../redux/hooks';
import {
  retryOnFailure,
  UPDATE_AGGREGATES_STATE,
  updateStartupState,
} from '../../../redux/slice/startupStateSlice';

function useInitializeDatabase() {
  const dispatch = useAppDispatch();

  const prepareDatabaseInitialStartup = async () => {
    await initializeRepository
      .initializeInitialTables()
      .then(() => {
        dispatch(updateStartupState(UPDATE_AGGREGATES_STATE));
      })
      .catch(reason => {
        logger.error('Failed first startup of the app', reason);
        dispatch(retryOnFailure());
      });
  };

  const runMigrations = async (changelog: MigrationChangelog[]) => {
    new SQLiteClient()
      .runMigrations(changelog)
      .then(() => {
        dispatch(updateStartupState(UPDATE_AGGREGATES_STATE));
      })
      .catch(reason => {
        logger.error('Failed running the migrations by startup', reason);
        dispatch(retryOnFailure());
      });
  };

  const getMigrationsCallback = async (changelog: MigrationChangelog[]) => {
    if (changelog.length === 0) {
      await prepareDatabaseInitialStartup();
      return;
    }
    await runMigrations(changelog);
  };

  const prepareDatabase = async () => {
    await initializeRepository
      .initializeChangelogTable()
      .then(() =>
        migrationChangelogRepository.getMigrationChangelog(
          getMigrationsCallback,
        ),
      )
      .catch(reason => {
        logger.error('Failed to initialize database', reason);
        dispatch(retryOnFailure());
      });
  };

  return { prepareDatabase };
}

export default useInitializeDatabase;
