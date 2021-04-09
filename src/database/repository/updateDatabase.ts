import * as SQLite from 'expo-sqlite';
import { Buffer } from 'buffer';
import { Regulation } from './regulationRepository';

const db = SQLite.openDatabase('db.db');

function updateVersioning(
  sqlTransaction: SQLite.SQLTransaction,
  aggregate: string,
  version: string,
): void {
  sqlTransaction.executeSql(
    `UPDATE versioning SET version = ? WHERE aggregate = ?`,
    [version, aggregate],
  );
}

function getHTMLBodyFromBase64(base64HTML: string): string {
  const base64String = base64HTML.split('data:text/html;base64,')[1];
  return Buffer.from(base64String, 'base64').toString('utf-8');
}

function addRegulation(
  sqlTransaction: SQLite.SQLTransaction,
  regulation: Regulation,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO regulation (chapter, pageIndex, title, subTitle, htmlFile, searchText, level, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      regulation.chapter,
      regulation.pageIndex,
      regulation.title,
      regulation.subTitle,
      getHTMLBodyFromBase64(regulation.htmlFile),
      regulation.searchText,
      regulation.level,
      regulation.iconFile,
    ],
  );
}

function addRegulations(
  sqlTransaction: SQLite.SQLTransaction,
  regulations: Regulation[],
): void {
  regulations.forEach(regulation => addRegulation(sqlTransaction, regulation));
}

function removeAllRegulations(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(`DROP TABLE regulation`, []);
}

function createRegulationTable(sqlTransaction: SQLite.SQLTransaction): void {
  sqlTransaction.executeSql(
    'create table if not exists regulation (chapter varchar not null constraint regulation_pk primary key, pageIndex integer not null, title varchar not null, subTitle varchar, htmlFile text not null, searchText text not null, level varchar not null, iconFile text);',
  );
}

function updateRegulations(regulations: Regulation[], version: string): void {
  db.transaction(
    sqlTransaction => {
      removeAllRegulations(sqlTransaction);
      createRegulationTable(sqlTransaction);
      updateVersioning(sqlTransaction, 'regulations', version);
      addRegulations(sqlTransaction, regulations);
    },
    error =>
      console.error('Updating regulations failed, rolled back, error: ', error),
  );
}

const updateDatabase = {
  updateRegulations,
};

export default updateDatabase;
