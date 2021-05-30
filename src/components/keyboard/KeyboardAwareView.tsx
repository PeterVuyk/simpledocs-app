import React from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import searching, { SearchText } from '../../redux/actions/searching';

interface Props {
  children: React.ReactNode;
  isKeyboardOpen: boolean;
}

const SearchScreen: React.FC<Props> = ({ children, isKeyboardOpen }) => {
  return (
    <View
      style={{ flex: 1, paddingBottom: isKeyboardOpen ? 0 : 60 }}
      onTouchStart={Keyboard.dismiss}
    >
      {children}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isKeyboardOpen: state.keyboard.isKeyboardOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChapterSearchText: (searchText: SearchText) =>
      dispatch(searching.setChapterSearchText(searchText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
