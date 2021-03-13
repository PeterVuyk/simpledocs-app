import * as SQLite from 'expo-sqlite';
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

function addRegulation(
  sqlTransaction: SQLite.SQLTransaction,
  regulation: Regulation,
): void {
  sqlTransaction.executeSql(
    'INSERT INTO regulation (chapter, page_index, title, sub_title, body, search_text, level, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      regulation.chapter,
      regulation.page_index,
      regulation.title,
      regulation.sub_title,
      regulation.body,
      regulation.search_text,
      regulation.level,
      regulation.icon,
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
  sqlTransaction.executeSql(`DELETE FROM regulation`, []);
}

function updateRegulations(regulations: Regulation[], version: string): void {
  db.transaction(
    sqlTransaction => {
      removeAllRegulations(sqlTransaction);
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
