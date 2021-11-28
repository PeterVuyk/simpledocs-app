import * as SQLite from 'expo-sqlite';
import logger from '../../util/logger';
import { InfoBookPage } from '../../model/bookPages/InfoBookPage';
import { BookPage } from '../../model/bookPages/BookPage';

const db = SQLite.openDatabase('db.db');

function toggleBookmark(infoBookPage: InfoBookPage): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `UPDATE bookPages
           SET bookmarked = ?
           WHERE chapter = ?
             AND bookType = ?`,
          [
            infoBookPage.bookmarked ? 0 : 1,
            infoBookPage.chapter,
            infoBookPage.bookType,
          ],
        );
      },
      error => {
        logger.error(
          'bookPagesRepository.toggleBookmark failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function getBookmarkedPages(
  callback: (pages: BookPage[]) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT * FROM bookPages WHERE bookmarked = 1`,
          [],
          // @ts-ignore
          (_, { rows: { _array } }) => {
            callback(_array as Page[]);
          },
        );
      },
      reject,
      resolve,
    );
  });
}

function getPages(callback: (bookPages: BookPage[]) => void): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM bookPages;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          callback(_array as BookPage[]);
        },
      );
    },
    error => logger.error('bookPagesRepository.getPages failed', error.message),
  );
}

function getPageByChapter(
  bookType: string,
  chapter: string,
  callback: (page: BookPage) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM bookPages WHERE bookType = ? AND chapter = ?;`,
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
      logger.error('bookPageRepository.getPageByChapter failed', error.message),
  );
}

function getPageById(
  id: string,
  callback: (page: BookPage) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(
      sqlTransaction => {
        sqlTransaction.executeSql(
          `SELECT * FROM bookPages WHERE id = ?;`,
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
        logger.error(
          'bookPageRepository.getBookPageById failed',
          error.message,
        );
        reject();
      },
      resolve,
    );
  });
}

function searchBookPagesByBookType(
  bookType: string,
  text: string,
  setPages: (pages: BookPage[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * FROM bookPages WHERE bookType = ? ORDER BY pageIndex)
       WHERE title LIKE ? OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, bookType, `%${text}%`, `%${text}%`],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setPages(_array);
        },
      );
    },
    error =>
      logger.error(
        'bookPagesRepository.searchPagesByBookType failed',
        error.message,
      ),
  );
}

function searchPagesByBookmarks(
  text: string,
  setPages: (pages: BookPage[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * FROM bookPages WHERE bookmarked = 1 ORDER BY pageIndex)
       WHERE title LIKE ? OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setPages(_array);
        },
      );
    },
    error =>
      logger.error(
        'bookPagesRepository.searchPagesByBookmarks failed',
        error.message,
      ),
  );
}

function getBookmarkedChapters(
  setChapters: (chapters: InfoBookPage[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, subTitle, pageIndex, chapterDivision, iconFile, bookmarked, bookType FROM bookPages WHERE bookmarked = 1 ORDER BY pageIndex;`,
        [],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setChapters(_array);
        },
      );
    },
    error =>
      logger.error(
        'bookPagesRepository.getBookmarkedChapters failed',
        error.message,
      ),
  );
}

function getChapters(
  bookType: string,
  setChapters: (chapters: InfoBookPage[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT id, chapter, title, subTitle, pageIndex, chapterDivision, iconFile, bookmarked, bookType FROM bookPages WHERE bookType = ? ORDER BY pageIndex;`,
        [bookType],
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setChapters(_array);
        },
      );
    },
    error =>
      logger.error('bookPagesRepository.getChapters failed', error.message),
  );
}

function getChaptersByList(
  bookType: string,
  chapters: string[],
  setChapters: (chapters: InfoBookPage[]) => void,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        // Not working with prepared statements is bad bad. But unfortunately SQLite doesn't work with prepared statement in combination with 'IN'
        `SELECT chapter, title, subTitle, bookType, pageIndex, chapterDivision, iconFile, bookmarked FROM bookPages WHERE bookType = ? AND chapter IN (${chapters
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
      logger.error(
        'bookPagesRepository.getChaptersByList failed',
        error.message,
      ),
  );
}

const bookPagesRepository = {
  getPages,
  getPageByChapter,
  getPageById,
  searchPagesByBookmarks,
  searchBookPagesByBookType,
  getChapters,
  getChaptersByList,
  toggleBookmark,
  getBookmarkedPages,
  getBookmarkedChapters,
};

export default bookPagesRepository;
