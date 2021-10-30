import React, { FC, ReactNode } from 'react';
import { View, Keyboard } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

interface Props {
  children: ReactNode;
}

const SearchScreen: FC<Props> = ({ children }) => {
  const isKeyboardVisible = useAppSelector(
    state => state.keyboard.isKeyboardVisible,
  );

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: isKeyboardVisible ? 0 : 60,
        backgroundColor: '#fff',
      }}
      onTouchStart={Keyboard.dismiss}
    >
      {children}
    </View>
  );
};

export default SearchScreen;
