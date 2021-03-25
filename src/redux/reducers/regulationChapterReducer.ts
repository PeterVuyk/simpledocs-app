import reduxTypes from '../actions/reduxTypes';

const initialState = {
  currentRegulationsChapter: '',
};

interface Action {
  type: string;
  data: string;
}

const regulationChapterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case reduxTypes.CURRENT_REGULATION_CHAPTER:
      if (action.data === '') {
        return state;
      }
      return {
        ...state,
        currentRegulationsChapter: action.data,
      };
    default:
      return state;
  }
};

export default regulationChapterReducer;
