import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import scrolling from '../redux/actions/scrolling';

interface Props {
  children: React.ReactNode;
  pageHeight: number;
  setScrollDirection: (scrollDirection: string) => void;
}

const ScrollViewToggleBottomBar: React.FC<Props> = ({
  children,
  pageHeight,
  setScrollDirection,
}) => {
  const [oldOffset, setOldOffset] = React.useState(0);

  React.useEffect(() => {
    return () => {
      setScrollDirection('up');
    };
  }, [setScrollDirection]);

  const handleScroll = (currentOffset: number) => {
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
      onScroll={event => handleScroll(event.nativeEvent.contentOffset.y)}
      contentContainerStyle={{
        flexGrow: 1,
        height: pageHeight,
      }}
    >
      {children}
    </ScrollView>
  );
};

const mapStateToProps = (state) => { // maps the state van redux naar de props voor component.
  return {
    scrollDirection: state.scrolling.scrollDirection,
  };
};

const mapDispatchToProps = (dispatch) => { // maps the actions naar de props
  return {
    setScrollDirection: (key) => dispatch(scrolling.setScrollDirection(key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScrollViewToggleBottomBar);
