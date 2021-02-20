import React from 'react';
import openDatabase from './openDatabase';

// eslint-disable-next-line @typescript-eslint/ban-types
function getRegulationsById(id: number, setRegulations: any): void {
  openDatabase.then(connection => {
    connection.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM regulations_content WHERE id = ?;`,
        [1],
        (_, { rows: { _array } }) => {
          setRegulations(_array);
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

const RegulationsRepository = {
  getRegulationsById,
  searchRegulations,
};

export default RegulationsRepository;
