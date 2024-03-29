import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Button } from 'react-native-elements';
import HideWithKeyboardView from './keyboard/HideWithKeyboardView';
import { useAppSelector } from '../redux/hooks';
import globalStyle from '../styling/globalStyle';

interface Props {
  title: string;
  onPress: () => void;
}

const ScrollAwareBottomButton: FC<Props> = ({ title, onPress }) => {
  const scrollDirection = useAppSelector(
    state => state.scrolling.scrollDirection,
  );

  const yValue = useRef(new Animated.Value(0)).current;

  const hideElement = useCallback(() => {
    Animated.timing(yValue, {
      useNativeDriver: false,
      toValue: 5,
      duration: 1000,
    }).start();
  }, [yValue]);

  const showElement = useCallback(() => {
    Animated.timing(yValue, {
      useNativeDriver: false,
      toValue: 60,
      duration: 300,
    }).start();
  }, [yValue]);

  useEffect(() => {
    if (scrollDirection === 'up') {
      showElement();
    }
    if (scrollDirection === 'down') {
      hideElement();
    }
  }, [hideElement, showElement, scrollDirection]);

  return (
    <HideWithKeyboardView>
      <Animated.View
        style={{
          margin: 10,
          position: 'absolute',
          bottom: yValue,
          right: 0,
        }}
      >
        <Button
          title={title}
          onPress={onPress}
          buttonStyle={{
            backgroundColor: globalStyle.color.primary.main,
            borderRadius: 5,
          }}
        />
      </Animated.View>
    </HideWithKeyboardView>
  );
};

export default ScrollAwareBottomButton;
