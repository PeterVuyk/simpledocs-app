import reduxTypes from './reduxTypes';

const setIsKeyboardOpen = (isKeyboardOpen: boolean) => ({
  type: reduxTypes.IS_KEYBOARD_OPEN,
  data: isKeyboardOpen,
});

const keyboard = {
  setIsKeyboardOpen,
};

export default keyboard;
