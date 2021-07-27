import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { Article } from '../../model/Article';

const db = SQLite.openDatabase('db.db');

function addArticle(
  sqlTransaction: SQLite.SQLTransaction,
  article: Article,
  articleType: string,
): void {
  sqlTransaction.executeSql(
    `INSERT INTO articles (chapter, pageIndex, title, articleType, subTitle, htmlFile, searchText, level, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      `${article.chapter}`,
      article.pageIndex,
      article.title,
      articleType,
      article.subTitle,
      article.htmlFile,
      article.searchText,
      article.level,
      article.iconFile,
    ],
  );
}

function addArticles(
  sqlTransaction: SQLite.SQLTransaction,
  articles: Article[],
  articleType: string,
): void {
  articles.forEach(article => addArticle(sqlTransaction, article, articleType));
}

function removeArticlesByType(
  sqlTransaction: SQLite.SQLTransaction,
  articleType: string,
): void {
  sqlTransaction.executeSql(`DELETE FROM articles WHERE articleType = ?`, [
    articleType,
  ]);
}

function updateArticles(
  articles: Article[],
  version: string,
  articleType: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeArticlesByType(sqlTransaction, articleType);
        versioningRepository.updateVersioning(
          sqlTransaction,
          articleType,
          version,
        );
        addArticles(sqlTransaction, articles, articleType);
      },
      error => {
        logger.error(
          `Updating ${articleType} failed, rolled back`,
          error.message,
        );
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
