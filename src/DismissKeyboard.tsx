import * as React from 'react';
import {Keyboard, View} from 'react-native';
import { ReactElement } from 'react';
import {Block} from "expo-ui-kit";

interface Props {
  children: ReactElement;
}

const DismissKeyboard: React.FC<Props> = ({ children }) => {
  return (
    <View style={{ flex: 1 }} onTouchStart={Keyboard.dismiss}>
      {children}
    </View>
  );
};

export default DismissKeyboard;
