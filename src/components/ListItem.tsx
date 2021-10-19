import { ListItem as Item } from 'react-native-elements';
import React, { FC } from 'react';
import SVGIcon from './SVGIcon';

interface Props {
  onSubmit: () => void;
  iconFile: string;
  title: string;
  subTitle?: string;
}

const ListItem: FC<Props> = ({ onSubmit, iconFile, title, subTitle }) => {
  return (
    <Item topDivider bottomDivider onPress={onSubmit}>
      <SVGIcon iconBlob={iconFile} />
      <Item.Content>
        <Item.Title>{title}</Item.Title>
        {subTitle !== undefined && subTitle !== '' && (
          <Item.Subtitle style={{ color: 'grey' }}>{subTitle}</Item.Subtitle>
        )}
      </Item.Content>
      <Item.Chevron />
    </Item>
  );
};

export default ListItem;
