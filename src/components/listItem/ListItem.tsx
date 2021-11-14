import { ListItem as Item } from 'react-native-elements';
import React, { FC } from 'react';
import { View } from 'react-native';
import SVGIcon from '../SVGIcon';
import BookmarkIndicator from './BookmarkIndicator';

interface Props {
  onSubmit: () => void;
  iconFile: string;
  title: string;
  subTitle?: string;
  bookmarked: boolean;
}

const ListItem: FC<Props> = ({
  onSubmit,
  iconFile,
  title,
  subTitle,
  bookmarked,
}) => {
  return (
    <View style={{ position: 'relative' }}>
      <Item topDivider bottomDivider onPress={onSubmit}>
        <SVGIcon iconBlob={iconFile} />
        <Item.Content>
          <Item.Title>{title}</Item.Title>
          {subTitle !== undefined && subTitle !== '' && (
            <Item.Subtitle style={{ color: '#616161' }}>
              {subTitle}
            </Item.Subtitle>
          )}
        </Item.Content>
        <Item.Chevron />
      </Item>
      {bookmarked ? <BookmarkIndicator /> : null}
    </View>
  );
};

export default ListItem;
