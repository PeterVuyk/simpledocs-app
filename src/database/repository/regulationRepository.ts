import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export interface Regulation {
  // eslint-disable-next-line camelcase
  page_index: number;
  chapter: string;
  level: string;
  title: string;
  // eslint-disable-next-line camelcase
  sub_title: string;
  body: string;
  // eslint-disable-next-line camelcase
  search_text: string;
  icon: string;
}

export interface Chapter {
  title: string;
  chapter: string;
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
            ,(CASE WHEN search_text like ? THEN 1 ELSE 0 END)
       FROM (SELECT * From regulation ORDER BY page_index)
       WHERE title LIKE ?
          OR search_text LIKE ?
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

function getChaptersSection(setRegulations: setRegulationsCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT * FROM regulation WHERE level = 'section' ORDER BY page_index;`,
        [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    },
    error => console.error('getChaptersSection failed: ', error),
  );
}

function getChapters(setChapters: setChaptersCallback): void {
  db.transaction(
    sqlTransaction => {
      sqlTransaction.executeSql(
        `SELECT chapter, title FROM regulation ORDER BY page_index;`,
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
  getChaptersSection,
  getChapters,
};

export default regulationRepository;
