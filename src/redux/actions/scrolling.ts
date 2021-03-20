import reduxTypes from './reduxTypes';

const setScrollDirection = (scrollDirection: string) => ({
  type: reduxTypes.SCROLL_DIRECTION,
  data: scrollDirection,
});

const scrolling = {
  setScrollDirection,
};

export default scrolling;
