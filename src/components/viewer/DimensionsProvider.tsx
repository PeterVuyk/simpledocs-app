import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface Props {
  children: (window: ScaledSize) => ReactNode;
}

const DimensionsProvider: FC<Props> = ({ children }) => {
  const window = Dimensions.get('window');
  const [dimensions, setDimensions] = useState({ window });
  const [loading, setLoading] = useState<boolean>(true);

  const onChange = useCallback(({ window }) => {
    setLoading(true);
    setDimensions({ window });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setDimensions({ window });
    setLoading(false);
  }, [onChange, window]);

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  return <>{!loading && children(dimensions.window)}</>;
};

export default DimensionsProvider;
