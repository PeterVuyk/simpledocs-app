import React, { FC, ReactNode } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import searching, { SearchText } from '../../redux/actions/searching';

interface Props {
  children: ReactNode;
  isKeyboardOpen: boolean;
}

const SearchScreen: FC<Props> = ({ children, isKeyboardOpen }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: isKeyboardOpen ? 0 : 60,
        backgroundColor: '#fff',
      }}
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
