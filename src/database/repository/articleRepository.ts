import * as SQLite from 'expo-sqlite';
import logger from '../../helper/logger';
import { Article } from '../entity/Article';
import { ArticleChapter } from '../entity/ArticleChapter';

const db = SQLite.openDatabase('db.db');

type setArticleCallback = (
  article: React.SetStateAction<Article | null | undefined>,
) => void;

type setArticlesCallback = (articles: React.SetStateAction<Article[]>) => void;

type setChaptersCallback = (
  chapters: React.SetStateAction<ArticleChapter[]>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getArticleByChapter(
  articleType: 'regulations' | 'instructionManual',
  chapter: string,
  setArticles: setArticleCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM ${articleType} WHERE chapter = ?;`,
        [chapter],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setArticles(_array[0]);
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
  articleType: 'regulations' | 'instructionManual',
  text: string,
  setArticles: setArticlesCallback,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
  articleType: 'regulations' | 'instructionManual',
  setArticles: setArticlesCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM ${articleType} WHERE level IN ('chapter', 'section', 'subSection') ORDER BY pageIndex;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
  articleType: 'regulations' | 'instructionManual',
  setChapters: setChaptersCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, iconFile FROM ${articleType} ORDER BY pageIndex;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
