import React from 'react';
import openDatabase from './openDatabase';

// eslint-disable-next-line @typescript-eslint/ban-types
function getRegulationsByChapter(chapter: string, setRegulations: any): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulations_content WHERE chapter = ?;`,
        [chapter],
        (_, { rows: { _array } }) => {
          if (_array.length === 1) {
            setRegulations(_array[0]);
          }
        },
      );
    });
  });
}

function searchRegulations(text: string, setRegulations: any): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulations_content WHERE title LIKE ? or search_text LIKE ?;`,
        [`%${text}%`, `%${text}%`],
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    });
  });
}

function getChapterSection(setRegulations: any): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulations_content WHERE level = 'section';`,
        [],
        (_, { rows: { _array } }) => {
          setRegulations(_array);
        },
      );
    });
  });
}

const RegulationsRepository = {
  getRegulationsByChapter,
  searchRegulations,
  getChapterSection,
};

export default RegulationsRepository;
