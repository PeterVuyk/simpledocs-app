import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { Article } from '../../model/Article';
import { ArticleChapter } from '../../model/ArticleChapter';
import { ArticleType } from '../../model/ArticleType';

const db = SQLite.openDatabase('db.db');

function getArticleByChapter(
  articleType: ArticleType,
  chapter: string,
  callback: (article: Article) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM ${articleType} WHERE chapter = ?;`,
        [chapter],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            callback(_array[0]);
          }
        },
      );
    },
    error =>
      logger.error(
        'articleRepository.getArticleByChapter failed',
        error.message,
      ),
  );
}

function searchArticles(
  articleType: ArticleType,
  text: string,
  setArticles: (articles: Article[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * FROM ${articleType} ORDER BY pageIndex)
       WHERE title LIKE ?
          OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setArticles(_array);
        },
      );
    },
    error =>
      logger.error('articleRepository.searchArticles failed', error.message),
  );
}

function getParagraphs(
  articleType: ArticleType,
  setArticles: (articles: Article[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM ${articleType} WHERE level IN ('chapter', 'section', 'subSection') ORDER BY pageIndex;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setArticles(_array);
        },
      );
    },
    error =>
      logger.error('articleRepository.getParagraphs failed', error.message),
  );
}

function getChapters(
  articleType: ArticleType,
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, iconFile FROM ${articleType} ORDER BY pageIndex;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setChapters(_array);
        },
      );
    },
    error =>
      logger.error('articleRepository.getChapters failed', error.message),
  );
}

const articleRepository = {
  getArticleByChapter,
  searchArticles,
  getParagraphs,
  getChapters,
};

export default articleRepository;
