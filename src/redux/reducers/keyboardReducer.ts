import reduxTypes from '../actions/reduxTypes';

const initialState = {
  isKeyboardOpen: false,
};

interface Action {
  type: string;
  data: boolean;
}

const keyboardReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case reduxTypes.IS_KEYBOARD_OPEN:
      return {
        ...state,
        isKeyboardOpen: action.data,
      };
    default:
      return state;
  }
};

export default keyboardReducer;
