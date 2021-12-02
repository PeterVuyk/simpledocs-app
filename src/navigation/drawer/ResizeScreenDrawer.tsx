import React, { FC, ReactNode } from 'react';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { useDrawerProgress } from '@react-navigation/drawer';

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
});

interface Props {
  children: ReactNode;
}

const ResizeScreenDrawer: FC<Props> = ({ children }) => {
  const progress = useDrawerProgress();

  // @ts-ignore
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  // @ts-ignore
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default ResizeScreenDrawer;
