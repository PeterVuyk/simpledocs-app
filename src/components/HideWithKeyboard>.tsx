import React, { useCallback, useEffect } from 'react';
import { View, Keyboard } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const HideWithKeyboard: React.FC<Props> = ({ children }) => {
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

  return <View>{isVisible && children}</View>;
};

export default HideWithKeyboard;
