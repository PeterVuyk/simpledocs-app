import database from './database';

interface Versioning {
  regulations: string;
  decisionTree: string;
  calculations: string;
  instructionManual: string;
  RVV1990: string;
  regelingOGS2009: string;
  brancherichtlijnMedischeHulpverlening: string;
  ontheffingGoedeTaakuitoefening: string;
}

async function getVersioning() {
  const versioning = await database()
    .collection('versioning')
    .doc('aggregate')
    .get();

  return versioning.data() as Versioning;
}

const collectVersions = {
  getVersioning,
};

export default collectVersions;
