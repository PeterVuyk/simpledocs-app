import * as SQLite from 'expo-sqlite';
import logger from '../../../util/logger';
import { Article } from '../../../model/Article';

const db = SQLite.openDatabase('db.db');

function addArticle(
  sqlTransaction: SQLite.SQLTransaction,
  article: Article,
  bookType: string,
): void {
  sqlTransaction.executeSql(
    `INSERT INTO articles (chapter, pageIndex, title, bookType, subTitle, content, contentType, searchText, chapterDivision, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      `${article.chapter}`,
      article.pageIndex,
      article.title,
      bookType,
      article.subTitle,
      article.content,
      article.contentType,
      article.searchText,
      article.chapterDivision,
      article.iconFile,
    ],
  );
}

function addArticles(
  sqlTransaction: SQLite.SQLTransaction,
  articles: Article[],
  bookType: string,
): void {
  articles.forEach(article => addArticle(sqlTransaction, article, bookType));
}

function removeArticlesByType(
  sqlTransaction: SQLite.SQLTransaction,
  bookType: string,
): void {
  sqlTransaction.executeSql(`DELETE FROM articles WHERE bookType = ?`, [
    bookType,
  ]);
}

function updateArticles(
  articles: Article[],
  version: string,
  bookType: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeArticlesByType(sqlTransaction, bookType);
        addArticles(sqlTransaction, articles, bookType);
      },
      error => {
        logger.error(`Updating ${bookType} failed, rolled back`, error.message);
        reject();
      },
      resolve,
    );
  });
}

const updateArticleTable = {
  updateArticles,
};

export default updateArticleTable;
