import * as SQLite from 'expo-sqlite';
import logger from '../../../util/logger';
import { ApiArticle } from '../../../model/articles/Article';

const db = SQLite.openDatabase('db.db');

function addArticle(
  sqlTransaction: SQLite.SQLTransaction,
  article: ApiArticle,
  bookType: string,
): void {
  sqlTransaction.executeSql(
    `INSERT INTO articles (id, chapter, pageIndex, title, bookType, subTitle, content, contentType, searchText, chapterDivision, iconFile, bookmarked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      article.id,
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
      `${article.bookmarked ? 1 : 0}`,
    ],
  );
}

function addArticles(
  sqlTransaction: SQLite.SQLTransaction,
  articles: ApiArticle[],
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
  articles: ApiArticle[],
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
