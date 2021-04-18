import React from 'react';
import { SvgXml } from 'react-native-svg';

interface Props {
  iconBlob: string;
}

const ChapterIcon: React.FC<Props> = ({ iconBlob }) => {
  const getIconFromBlob = (): string => {
    const base64String = iconBlob.split('data:image/svg+xml;base64,')[1];
    return atob(base64String);
  };

  return <SvgXml width={20} height={20} xml={getIconFromBlob()} />;
};

export default ChapterIcon;
