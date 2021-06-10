import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { Article } from '../model/Article';

const db = SQLite.openDatabase('db.db');

function addInstructionManualArticle(
  sqlTransaction: SQLite.SQLTransaction,
  instructionManual: Article,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO instructionManual (chapter, pageIndex, title, subTitle, htmlFile, searchText, level, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      instructionManual.chapter,
      instructionManual.pageIndex,
      instructionManual.title,
      instructionManual.subTitle,
      instructionManual.htmlFile,
      instructionManual.searchText,
      instructionManual.level,
      instructionManual.iconFile,
    ],
  );
}

function addInstructionManual(
  sqlTransaction: SQLite.SQLTransaction,
  instructionManual: Article[],
): void {
  instructionManual.forEach(article =>
    addInstructionManualArticle(sqlTransaction, article),
  );
}

function removeAllInstructionManualArticles(
  sqlTransaction: SQLite.SQLTransaction,
): void {
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS instructionManual`, []);
}

function createInstructionManualTable(
  sqlTransaction: SQLite.SQLTransaction,
): void {
  sqlTransaction.executeSql(
    'create table if not exists instructionManual (chapter varchar not null constraint instruction_manual_pk primary key, pageIndex integer not null, title text not null, subTitle text, htmlFile text not null, searchText text not null, level varchar not null, iconFile text);',
  );
}

function updateInstructionManual(
  instructionManual: Article[],
  version: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllInstructionManualArticles(sqlTransaction);
        createInstructionManualTable(sqlTransaction);
        versioningRepository.updateVersioning(
          sqlTransaction,
          'instructionManual',
          version,
        );
        addInstructionManual(sqlTransaction, instructionManual);
      },
      error => {
        logger.error(
          'Updating instructionManual failed, rolled back',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

const updateInstructionManualTable = {
  updateInstructionManual,
};

export default updateInstructionManualTable;
