import React, { FC, ReactNode } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface Props {
  children: (window: ScaledSize) => ReactNode;
}

/**
 * The goal was to recalculate the dimensions for users with a flip phone,
 * or for the future when we support landscape apps. The problem is that
 * the dimensions event listener gets triggered when a user watch a full screen video.
 * For now we comment that functionality and have to look later for a workaround.
 */
const DimensionsProvider: FC<Props> = ({ children }) => {
  const window = Dimensions.get('window');
  // const [dimensions, setDimensions] = useState({ window });
  // const [loading, setLoading] = useState<boolean>(true);

  // const onChange = useCallback(({ window }) => {
  //   setLoading(true);
  //   setDimensions({ window });
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   setDimensions({ window });
  //   setLoading(false);
  // }, [onChange, window]);

  // useEffect(() => {
  //   Dimensions.addEventListener('change', onChange);
  //   return () => {
  //     Dimensions.removeEventListener('change', onChange);
  //   };
  // });

  return <>{children(window)}</>;
  // return <>{!loading && children(dimensions.window)}</>;
};

export default DimensionsProvider;
