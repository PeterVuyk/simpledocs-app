import database from './database';

export interface Versioning {
  regulations: string;
  decisionTree: string;
  breakingDistance: string;
}

async function getVersioning() {
  const versioning = await database()
    .collection('versioning')
    .doc('aggregate')
    .get();

  return versioning.data() as Versioning;
}

const collectRegulations = {
  getVersioning,
};

export default collectRegulations;
