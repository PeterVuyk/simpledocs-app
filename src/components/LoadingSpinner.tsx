import React, { FC } from 'react';
import { Spinner } from 'native-base';
import globalStyle from '../styling/globalStyle';

interface Props {
  hidden?: boolean;
}

const LoadingSpinner: FC<Props> = ({ hidden }) => {
  return (
    <Spinner
      style={{
        height: 40,
        opacity: hidden ? 0 : 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      color={globalStyle.color.primary.light}
    />
  );
};

export default LoadingSpinner;
