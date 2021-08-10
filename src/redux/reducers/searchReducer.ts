import reduxTypes from '../actions/reduxTypes';

const initialState = {
  chapterSearchText: { searchText: '', chapter: '', bookType: null },
};

interface Action {
  type: string;
  data: string;
}

const searchReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case reduxTypes.SEARCH_CHAPTER_TEXT:
      return {
        ...state,
        chapterSearchText: action.data,
      };
    default:
      return state;
  }
};

export default searchReducer;
