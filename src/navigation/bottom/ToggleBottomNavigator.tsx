import React, { useCallback, useEffect } from 'react';
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';

interface Props {
  children: React.ReactNode;
  scrollDirection: string;
}

const ToggleBottomNavigator: React.FC<Props> = ({
  children,
  scrollDirection,
}) => {
  const yValue = React.useRef(new Animated.Value(0)).current;

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

const mapStateToProps = (state) => {
  return {
    scrollDirection: state.scrolling.scrollDirection,
  };
};

export default connect(mapStateToProps)(ToggleBottomNavigator);
