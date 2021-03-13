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

type setRegulationCallback = (
  regulations: React.SetStateAction<Regulation | null | undefined>,
) => void;

type setRegulationsCallback = (
  regulations: React.SetStateAction<Regulation[]>,
) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
function getRegulationByChapter(
  chapter: string,
  setRegulations: setRegulationCallback,
): void {
  db.transaction(sqlTransaction => {
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
  });
}

function searchRegulations(
  text: string,
  setRegulations: setRegulationsCallback,
): void {
  db.transaction(sqlTransaction => {
    sqlTransaction.executeSql(
      `SELECT * FROM regulation WHERE title LIKE ? or search_text LIKE ?;`,
      [`%${text}%`, `%${text}%`],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_, { rows: { _array } }) => {
        setRegulations(_array);
      },
    );
  });
}

function getChaptersSection(setRegulations: setRegulationsCallback): void {
  db.transaction(sqlTransaction => {
    sqlTransaction.executeSql(
      `SELECT * FROM regulation WHERE level = 'section';`,
      [],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (_, { rows: { _array } }) => {
        setRegulations(_array);
      },
    );
  });
}

const regulationRepository = {
  getRegulationByChapter,
  searchRegulations,
  getChaptersSection,
};

export default regulationRepository;
