import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { View, Keyboard, StyleProp, ViewStyle } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { hideKeyboard, showKeyboard } from '../../redux/slice/keyboardSlice';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const HideWithKeyboardView: FC<Props> = ({ style, children }) => {
  const isKeyboardVisible = useAppSelector(
    state => state.keyboard.isKeyboardVisible,
  );
  const dispatch = useAppDispatch();

  const keyboardDidShow = useCallback(() => {
    dispatch(showKeyboard());
  }, [dispatch]);

  const keyboardDidHide = useCallback(() => {
    dispatch(hideKeyboard());
  }, [dispatch]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, [keyboardDidHide, keyboardDidShow]);

  return <View style={style}>{!isKeyboardVisible && children}</View>;
};

export default HideWithKeyboardView;
