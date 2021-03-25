import reduxTypes from './reduxTypes';

const setCurrentRegulationsChapter = (currentRegulationsChapter: string) => ({
  type: reduxTypes.CURRENT_REGULATION_CHAPTER,
  data: currentRegulationsChapter,
});

const regulations = {
  setCurrentRegulationsChapter,
};

export default regulations;
