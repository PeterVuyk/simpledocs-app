import React from 'react';
import { SvgXml } from 'react-native-svg';

interface Props {
  iconBlob: string;
}

const SVGIcon: React.FC<Props> = ({ iconBlob }) => {
  const getIconFromBlob = (): string => {
    const base64String = iconBlob.split('data:image/svg+xml;base64,')[1];
    return atob(base64String);
  };

  return <SvgXml width={25} height={25} xml={getIconFromBlob()} />;
};

export default SVGIcon;
