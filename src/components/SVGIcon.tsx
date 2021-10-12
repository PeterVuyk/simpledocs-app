import React, { FC } from 'react';
import { SvgXml } from 'react-native-svg';

interface Props {
  iconBlob: string;
}

const SVGIcon: FC<Props> = ({ iconBlob }) => {
  const getIconFromBlob = (): string => {
    const base64String = iconBlob.split('data:image/svg+xml;base64,')[1];
    return atob(base64String);
  };

  return <SvgXml width={50} height={50} xml={getIconFromBlob()} />;
};

export default SVGIcon;
