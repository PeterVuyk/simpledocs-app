import React, {useCallback, useEffect} from 'react';
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';

interface Props {
  children: React.ReactNode;
  scrollDirection: string;
}

const HideOnScrollDown: React.FC<Props> = ({ children, scrollDirection }) => {
  const yValue = React.useRef(new Animated.Value(0)).current;

  const hideElement = useCallback(() => {
    Animated.timing(yValue, {
      useNativeDriver: false,
      toValue: -55,
      duration: 1000,
    }).start();
  }, [yValue]);

  const showElement = useCallback(() => {
    Animated.timing(yValue, {
      useNativeDriver: false,
      toValue: 0,
      duration: 1000,
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
    <View>
      <Animated.View style={{ bottom: yValue }}>{children}</Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    scrollDirection: state.scrolling.scrollDirection,
  };
};

export default connect(mapStateToProps)(HideOnScrollDown);
