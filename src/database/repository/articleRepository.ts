import * as SQLite from 'expo-sqlite';
import logger from '../../util/logger';
import { Article } from '../../model/articles/Article';
import { ArticleChapter } from '../../model/articles/ArticleChapter';

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
            articleChapter.bookmarked ? 0 : 1,
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

function getBookmarkedArticles(
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
      reject,
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
      logger.error('articleRepository.getArticles failed', error.message),
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

function getArticleById(
  id: string,
  callback: (article: Article) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT * FROM articles WHERE id = ?;`,
          [id],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            if (_array.length === 1) {
              callback(_array[0]);
            }
          },
        );
      },
      error => {
        logger.error('articleRepository.getArticleById failed', error.message);
        reject();
      },
      resolve,
    );
  });
}

function searchArticlesByBookType(
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
      logger.error(
        'articleRepository.searchArticlesByBookType failed',
        error.message,
      ),
  );
}

function searchArticlesByBookmarks(
  text: string,
  setArticles: (articles: Article[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * FROM articles WHERE bookmarked = 1 ORDER BY pageIndex)
       WHERE title LIKE ? OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setArticles(_array);
        },
      );
    },
    error =>
      logger.error(
        'articleRepository.searchArticlesByBookmarks failed',
        error.message,
      ),
  );
}

function getBookmarkedChapters(
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, subTitle, pageIndex, chapterDivision, iconFile, bookmarked, bookType FROM articles WHERE bookmarked = 1 ORDER BY pageIndex;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setChapters(_array);
        },
      );
    },
    error =>
      logger.error(
        'articleRepository.getBookmarkedChapters failed',
        error.message,
      ),
  );
}

function getChapters(
  bookType: string,
  setChapters: (chapters: ArticleChapter[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT id, chapter, title, subTitle, pageIndex, chapterDivision, iconFile, bookmarked, bookType FROM articles WHERE bookType = ? ORDER BY pageIndex;`,
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
        `SELECT chapter, title, subTitle, pageIndex, chapterDivision, iconFile, bookmarked FROM articles WHERE bookType = ? AND chapter IN (${chapters
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
  getArticleById,
  searchArticlesByBookmarks,
  searchArticlesByBookType,
  getChapters,
  getChaptersByList,
  toggleBookmark,
  getBookmarkedArticles,
  getBookmarkedChapters,
};

export default articleRepository;
