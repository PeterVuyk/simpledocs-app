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
    const base64String = iconBlob.split('data:image/svg+xml;base64,')[1];
    return atob(base64String);
  };

  const svgWidth = svgIconType === SVG_ICON_TYPE_LIST_ITEM ? 60 : 100;
  const svgHeight = svgIconType === SVG_ICON_TYPE_LIST_ITEM ? 60 : 100;

  return <SvgXml width={svgWidth} height={svgHeight} xml={getIconFromBlob()} />;
};

export default SVGIcon;
