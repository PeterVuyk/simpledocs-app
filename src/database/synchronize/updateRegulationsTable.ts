import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { Article } from '../entity/Article';

const db = SQLite.openDatabase('db.db');

function addRegulation(
  sqlTransaction: SQLite.SQLTransaction,
  regulation: Article,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO regulations (chapter, pageIndex, title, subTitle, htmlFile, searchText, level, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      regulation.chapter,
      regulation.pageIndex,
      regulation.title,
      regulation.subTitle,
      regulation.htmlFile,
      regulation.searchText,
      regulation.level,
      regulation.iconFile,
    ],
  );
}

function addRegulations(
  sqlTransaction: SQLite.SQLTransaction,
  regulations: Article[],
): void {
  regulations.forEach(regulation => addRegulation(sqlTransaction, regulation));
}

function removeAllRegulations(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS regulations`, []);
}

function createRegulationTable(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(
    'create table if not exists regulations (chapter varchar not null constraint regulations_pk primary key, pageIndex integer not null, title text not null, subTitle text, htmlFile text not null, searchText text not null, level varchar not null, iconFile text);',
  );
}

function updateRegulations(
  regulations: Article[],
  version: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllRegulations(sqlTransaction);
        createRegulationTable(sqlTransaction);
        versioningRepository.updateVersioning(
          sqlTransaction,
          'regulations',
          version,
        );
        addRegulations(sqlTransaction, regulations);
      },
      error => {
        logger.error('Updating regulations failed, rolled back', error.message);
        reject();
      },
      resolve,
    );
  });
}

const updateRegulationsTable = {
  updateRegulations,
};

export default updateRegulationsTable;
