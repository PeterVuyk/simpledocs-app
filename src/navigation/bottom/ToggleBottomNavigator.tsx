import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

interface Props {
  children: ReactNode;
}

const ToggleBottomNavigator: FC<Props> = ({ children }) => {
  const yValue = useRef(new Animated.Value(0)).current;
  const scrollDirection = useAppSelector(
    state => state.scrolling.scrollDirection,
  );

  const hideElement = useCallback(() => {
    Animated.timing(yValue, {
      useNativeDriver: false,
      toValue: -60,
      duration: 1000,
    }).start();
  }, [yValue]);

  const showElement = useCallback(() => {
    Animated.timing(yValue, {
      useNativeDriver: false,
      toValue: 0,
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
    <Animated.View style={{ bottom: yValue }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          position: 'absolute',
          bottom: 0,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default ToggleBottomNavigator;
