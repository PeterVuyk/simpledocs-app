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
    `INSERT INTO ${articleType} (chapter, pageIndex, title, subTitle, htmlFile, searchText, level, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      `${article.chapter}`,
      article.pageIndex,
      article.title,
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

function removeAllArticles(
  sqlTransaction: SQLite.SQLTransaction,
  articleType: string,
): void {
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS ${articleType}`, []);
}

function createArticleTable(
  sqlTransaction: SQLite.SQLTransaction,
  articleType: string,
): void {
  sqlTransaction.executeSql(
    `create table if not exists ${articleType} (chapter varchar not null constraint article_pk primary key, pageIndex integer not null, title text not null, subTitle text, htmlFile text not null, searchText text not null, level varchar not null, iconFile blob);`,
  );
}

function updateArticles(
  articles: Article[],
  version: string,
  articleType: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        removeAllArticles(sqlTransaction, articleType);
        createArticleTable(sqlTransaction, articleType);
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
