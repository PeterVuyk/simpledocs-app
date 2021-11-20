import React, { FC, ReactNode } from 'react';
import { View, Keyboard } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import globalStyle from '../../styling/globalStyle';

interface Props {
  children: ReactNode;
}

const KeyboardAwareView: FC<Props> = ({ children }) => {
  const isKeyboardVisible = useAppSelector(
    state => state.keyboard.isKeyboardVisible,
  );

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: isKeyboardVisible ? 0 : 60,
        backgroundColor: globalStyle.color.white,
      }}
      onTouchStart={Keyboard.dismiss}
    >
      {children}
    </View>
  );
};

export default KeyboardAwareView;
