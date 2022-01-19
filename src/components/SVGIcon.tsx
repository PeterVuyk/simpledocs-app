import React, { FC } from 'react';
import { SvgXml } from 'react-native-svg';
import {
  SVG_ICON_TYPE_LIST_ITEM,
  SVGIconType,
} from '../model/style/SVGIconType';

interface Props {
  svgIconType: SVGIconType;
  iconBlob: string;
}

const SVGIcon: FC<Props> = ({ iconBlob, svgIconType }) => {
  const getIconFromBlob = (): string => {
    const base64String = iconBlob.split('data:image/svg+xml;base64,');
    if (base64String === null || base64String.length === 1) {
      return '';
    }
    return atob(base64String[1]);
  };

  const svgWidth = svgIconType === SVG_ICON_TYPE_LIST_ITEM ? 60 : 100;
  const svgHeight = svgIconType === SVG_ICON_TYPE_LIST_ITEM ? 60 : 100;

  return (
    <>
      {getIconFromBlob() !== '' && (
        <SvgXml width={svgWidth} height={svgHeight} xml={getIconFromBlob()} />
      )}
    </>
  );
};

export default SVGIcon;
