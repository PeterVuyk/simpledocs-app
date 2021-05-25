import React, { useCallback, useEffect } from 'react';
import { Animated } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import HideWithKeyboardView from './HideWithKeyboardView';

interface Props {
  title: string;
  scrollDirection: string;
  onPress: () => void;
}

const ScrollAwareBottomButton: React.FC<Props> = ({
  title,
  scrollDirection,
  onPress,
}) => {
  const yValue = React.useRef(new Animated.Value(0)).current;

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
          buttonStyle={{ backgroundColor: '#154594', borderRadius: 5 }}
        />
      </Animated.View>
    </HideWithKeyboardView>
  );
};

const mapStateToProps = state => {
  return {
    scrollDirection: state.scrolling.scrollDirection,
  };
};

export default connect(mapStateToProps)(ScrollAwareBottomButton);
