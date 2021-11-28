import * as SQLite from 'expo-sqlite';
import logger from '../../../util/logger';
import { ApiBookPage } from '../../../model/bookPages/BookPage';

const db = SQLite.openDatabase('db.db');

function addPage(
  sqlTransaction: SQLite.SQLTransaction,
  bookPage: ApiBookPage,
  bookType: string,
): void {
  sqlTransaction.executeSql(
    `INSERT INTO bookPages (id, chapter, pageIndex, title, bookType, subTitle, content, contentType, searchText, chapterDivision, iconFile, bookmarked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      bookPage.id,
      `${bookPage.chapter}`,
      bookPage.pageIndex,
      bookPage.title,
      bookType,
      bookPage.subTitle,
      bookPage.content,
      bookPage.contentType,
      bookPage.searchText,
      bookPage.chapterDivision,
      bookPage.iconFile,
      `${bookPage.bookmarked ? 1 : 0}`,
    ],
  );
}

function addPages(
  sqlTransaction: SQLite.SQLTransaction,
  pages: ApiBookPage[],
  bookType: string,
): void {
  pages.forEach(page => addPage(sqlTransaction, page, bookType));
}

function removePagesByType(
  sqlTransaction: SQLite.SQLTransaction,
  bookType: string,
): void {
  sqlTransaction.executeSql(`DELETE FROM bookPages WHERE bookType = ?`, [
    bookType,
  ]);
}

function updateBookPages(
  pages: ApiBookPage[],
  version: string,
  bookType: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removePagesByType(sqlTransaction, bookType);
        addPages(sqlTransaction, pages, bookType);
      },
      error => {
        logger.error(`Updating ${bookType} failed, rolled back`, error.message);
        reject();
      },
      resolve,
    );
  });
}

const updateBookPageTable = {
  updateBookPages,
};

export default updateBookPageTable;
