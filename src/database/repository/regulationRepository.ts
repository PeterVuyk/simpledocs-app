import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export interface Regulation {
  pageIndex: number;
  chapter: string;
  level: string;
  title: string;
  subTitle: string;
  htmlFile: string;
  searchText: string;
  iconFile: string;
}

export interface Chapter {
  title: string;
  chapter: string;
  iconFile: string;
}

type setRegulationCallback = (
  regulations: React.SetStateAction<Regulation | null | undefined>,
) => void;

type setRegulationsCallback = (
  regulations: React.SetStateAction<Regulation[]>,
) => void;

type setChaptersCallback = (chapters: React.SetStateAction<Chapter[]>) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getRegulationByChapter(
  chapter: string,
  setRegulations: setRegulationCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM regulation WHERE chapter = ?;`,
        [chapter],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setRegulations(_array[0]);
          }
        },
      );
    },
    error => console.error('getRegulationByChapter failed: ', error),
  );
}

function searchRegulations(
  text: string,
  setRegulations: setRegulationsCallback,
): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT *
            ,(CASE WHEN title LIKE ? THEN 1 ELSE 0 END) AS [priority]
            ,(CASE WHEN searchText like ? THEN 1 ELSE 0 END)
       FROM (SELECT * From regulation ORDER BY pageIndex)
       WHERE title LIKE ?
          OR searchText LIKE ?
       ORDER BY [priority] DESC;`,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    },
    error => console.error('searchRegulations failed: ', error),
  );
}

function getChaptersByLevelChapter(setRegulations: setRegulationsCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM regulation WHERE level = 'chapter' ORDER BY pageIndex;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    },
    error => console.error('getChaptersByLevelChapter failed: ', error),
  );
}

function getChapters(setChapters: setChaptersCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title, iconFile FROM regulation ORDER BY pageIndex;`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [],
        (_, { rows: { _array } }) => {
          setChapters(_array);
        },
      );
    },
    error => console.error('getChapters failed: ', error),
  );
}

const regulationRepository = {
  getRegulationByChapter,
  searchRegulations,
  getChaptersByLevelChapter,
  getChapters,
};

export default regulationRepository;
