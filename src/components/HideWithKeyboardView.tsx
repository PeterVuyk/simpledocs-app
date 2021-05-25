import React, { useCallback, useEffect } from 'react';
import { View, Keyboard, StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const HideWithKeyboardView: React.FC<Props> = ({ style, children }) => {
  const [isVisible, setVisible] = React.useState<boolean>(true);

  const keyboardDidShow = useCallback(() => {
    setVisible(false);
  }, []);
  const keyboardDidHide = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, [keyboardDidHide, keyboardDidShow]);

  return <View style={style}>{isVisible && children}</View>;
};

export default HideWithKeyboardView;
