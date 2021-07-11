interface AggregateVersionsOld {
  regulations: string;
  decisionTree: string;
  calculations: string;
  instructionManual: string;
  RVV1990: string;
  regelingOGS2009: string;
  brancherichtlijnMedischeHulpverlening: string;
  ontheffingGoedeTaakuitoefening: string;
}

export interface AggregateVersions {
  [key: string]: string;
}
