import React, { useCallback, useEffect } from 'react';
import { View, Keyboard, StyleProp, ViewStyle } from 'react-native';
import { connect } from 'react-redux';
import keyboard from '../../redux/actions/keyboard';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  isKeyboardOpen: boolean;
  setIsKeyboardOpen: (isKeyboardOpen: boolean) => void;
}

const HideWithKeyboardView: React.FC<Props> = ({
  style,
  children,
  isKeyboardOpen,
  setIsKeyboardOpen,
}) => {
  const keyboardDidShow = useCallback(() => {
    setIsKeyboardOpen(true);
  }, [setIsKeyboardOpen]);
  const keyboardDidHide = useCallback(() => {
    setIsKeyboardOpen(false);
  }, [setIsKeyboardOpen]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, [isKeyboardOpen, keyboardDidHide, keyboardDidShow]);

  return <View style={style}>{!isKeyboardOpen && children}</View>;
};

const mapStateToProps = state => {
  // maps the state van redux naar de props voor component.
  return {
    isKeyboardOpen: state.keyboard.isKeyboardOpen,
  };
};

const mapDispatchToProps = dispatch => {
  // maps the actions naar de props
  return {
    setIsKeyboardOpen: key => dispatch(keyboard.setIsKeyboardOpen(key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HideWithKeyboardView);
