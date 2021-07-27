import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { Article } from '../../model/Article';
import { ArticleChapter } from '../../model/ArticleChapter';

const db = SQLite.openDatabase('db.db');

function getArticleByChapter(
  articleType: string,
  chapter: string,
  callback: (article: Article) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM articles WHERE articleType = ? AND chapter = ?;`,
        [articleType, chapter],
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
  articleType: string,
  text: string,
  setArticles: (articles: Article[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * FROM articles WHERE articleType = ? ORDER BY pageIndex)
       WHERE title LIKE ? OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, articleType, `%${text}%`, `%${text}%`],
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

function getChapters(
  articleType: string,
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, subTitle, pageIndex, level, iconFile FROM articles WHERE articleType = ? ORDER BY pageIndex;`,
        [articleType],
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

function getChaptersByList(
  articleType: string,
  chapters: string[],
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        // Not working with prepared statements is bad bad. But unfortunately SQLite doesn't work with prepared statement in combination with 'IN'
        `SELECT chapter, title, subTitle, pageIndex, level, iconFile FROM articles WHERE articleType = ? AND chapter IN (${chapters
          .map(value => `'${value}'`)
          .join(', ')}) ORDER BY pageIndex;`,
        [articleType],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setChapters(_array);
        },
      );
    },
    error =>
      logger.error('articleRepository.getChaptersByList failed', error.message),
  );
}

const articleRepository = {
  getArticleByChapter,
  searchArticles,
  getChapters,
  getChaptersByList,
};

export default articleRepository;
