import React, { FC, ReactNode, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import scrolling from '../redux/actions/scrolling';

interface Props {
  children: ReactNode;
  pageHeight: number;
  setScrollDirection: (scrollDirection: string) => void;
}

const ScrollViewToggleBottomBar: FC<Props> = ({
  children,
  pageHeight,
  setScrollDirection,
}) => {
  const [oldOffset, setOldOffset] = useState(0);

  useEffect(() => {
    return () => {
      setScrollDirection('up');
    };
  }, [setScrollDirection]);

  const handleScroll = (currentOffset: number) => {
    if (currentOffset < 1) {
      setScrollDirection('up');
      return;
    }
    setOldOffset(currentOffset);
    if (currentOffset >= 0 && currentOffset !== 0) {
      if (currentOffset < oldOffset) {
        setScrollDirection('up');
      } else {
        setScrollDirection('down');
      }
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      nestedScrollEnabled
      onScroll={event => {
        handleScroll(event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={1}
      contentContainerStyle={{
        flexGrow: 1,
        height: pageHeight,
      }}
    >
      {children}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  // maps the state van redux naar de props voor component.
  return {
    scrollDirection: state.scrolling.scrollDirection,
  };
};

const mapDispatchToProps = dispatch => {
  // maps the actions naar de props
  return {
    setScrollDirection: key => dispatch(scrolling.setScrollDirection(key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScrollViewToggleBottomBar);
