import * as SQLite from 'expo-sqlite';
import logger from '../../util/logger';
import { Article } from '../../model/Article';
import { ArticleChapter } from '../../model/ArticleChapter';

const db = SQLite.openDatabase('db.db');

function toggleBookmark(articleChapter: ArticleChapter): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `UPDATE articles
           SET bookmarked = ?
           WHERE chapter = ?
             AND bookType = ?`,
          [
            !articleChapter.bookmarked,
            articleChapter.chapter,
            articleChapter.bookType,
          ],
        );
      },
      error => {
        logger.error('articleRepository.toggleBookmark failed', error.message);
        reject();
      },
      resolve,
    );
  });
}

function getBookmarkedChapters(
  callback: (article: Article[]) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT * FROM articles WHERE bookmarked = 1`,
          [],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            callback(_array as Article[]);
          },
        );
      },
      error => {
        logger.error(
          'articleRepository.getBookmarkedChapters failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function getArticles(callback: (article: Article[]) => void): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM articles;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          callback(_array as Article[]);
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

function getArticleByChapter(
  bookType: string,
  chapter: string,
  callback: (article: Article) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM articles WHERE bookType = ? AND chapter = ?;`,
        [bookType, chapter],
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
  bookType: string,
  text: string,
  setArticles: (articles: Article[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * FROM articles WHERE bookType = ? ORDER BY pageIndex)
       WHERE title LIKE ? OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, bookType, `%${text}%`, `%${text}%`],
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
  bookType: string,
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, subTitle, pageIndex, chapterDivision, bookType, iconFile, bookmarked FROM articles WHERE bookType = ? ORDER BY pageIndex;`,
        [bookType],
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
  bookType: string,
  chapters: string[],
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        // Not working with prepared statements is bad bad. But unfortunately SQLite doesn't work with prepared statement in combination with 'IN'
        `SELECT chapter, title, subTitle, pageIndex, chapterDivision, iconFile FROM articles WHERE bookType = ? AND chapter IN (${chapters
          .map(value => `'${value}'`)
          .join(', ')}) ORDER BY pageIndex;`,
        [bookType],
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
  getArticles,
  getArticleByChapter,
  searchArticles,
  getChapters,
  getChaptersByList,
  toggleBookmark,
  getBookmarkedChapters,
};

export default articleRepository;
