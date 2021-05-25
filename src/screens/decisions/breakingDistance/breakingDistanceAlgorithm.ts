const calculate = (kmPerHour: number | undefined): number => {
  return kmPerHour ? kmPerHour / 10 : 0;
};

const breakingDistanceAlgorithm = {
  calculate,
};

export default breakingDistanceAlgorithm;
