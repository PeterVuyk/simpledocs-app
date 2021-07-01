import * as SQLite from 'expo-sqlite';
import versioningRepository from '../repository/versioningRepository';
import logger from '../../helper/logger';
import { Article } from '../../model/Article';
import { ArticleType } from '../../model/ArticleType';

const db = SQLite.openDatabase('db.db');

function addArticle(
  sqlTransaction: SQLite.SQLTransaction,
  instructionManual: Article,
  articleType: ArticleType,
): void {
  sqlTransaction.executeSql(
    `INSERT INTO ${articleType} (chapter, pageIndex, title, subTitle, htmlFile, searchText, level, iconFile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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

function addArticles(
  sqlTransaction: SQLite.SQLTransaction,
  instructionManual: Article[],
  articleType: ArticleType,
): void {
  instructionManual.forEach(article =>
    addArticle(sqlTransaction, article, articleType),
  );
}

function removeAllArticles(
  sqlTransaction: SQLite.SQLTransaction,
  articleType: ArticleType,
): void {
  sqlTransaction.executeSql(`DROP TABLE IF EXISTS ${articleType}`, []);
}

function createArticleTable(
  sqlTransaction: SQLite.SQLTransaction,
  articleType: ArticleType,
): void {
  sqlTransaction.executeSql(
    `create table if not exists ${articleType} (chapter varchar not null constraint instruction_manual_pk primary key, pageIndex integer not null, title text not null, subTitle text, htmlFile text not null, searchText text not null, level varchar not null, iconFile blob);`,
  );
}

function updateArticles(
  articles: Article[],
  version: string,
  articleType: ArticleType,
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
