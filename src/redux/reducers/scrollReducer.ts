import reduxTypes from '../actions/reduxTypes';

const initialState = {
  scrollDirection: 'up',
};

interface Action {
  type: string;
  data: string;
}

const scrollReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case reduxTypes.SCROLL_DIRECTION:
      if (action.data === state.scrollDirection) {
        return state;
      }
      return {
        ...state,
        scrollDirection: action.data,
      };
    default:
      return state;
  }
};

export default scrollReducer;
