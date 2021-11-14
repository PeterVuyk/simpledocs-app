import { ListItem as Item } from 'react-native-elements';
import React, { FC } from 'react';
import { Icon } from 'native-base';
import { View, StyleSheet } from 'react-native';
import SVGIcon from './SVGIcon';

interface Props {
  onSubmit: () => void;
  iconFile: string;
  title: string;
  subTitle?: string;
  bookmarked: boolean;
}

const styles = StyleSheet.create({
  buttonColor: {
    zIndex: 100,
    color: '#5bb5f6',
    position: 'absolute',
    right: 50,
    top: 0,
  },
});

const ListItem: FC<Props> = ({
  onSubmit,
  iconFile,
  title,
  subTitle,
  bookmarked,
}) => {
  return (
    <View
      style={{
        flex: 1,
        zIndex: 1,
        position: 'relative',
        backgroundColor: 'pink',
      }}
    >
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
      {bookmarked ? (
        <Icon
          style={styles.buttonColor}
          name="bookmark-check"
          type="MaterialCommunityIcons"
          fontSize={26}
        />
      ) : null}
    </View>
  );
};

export default ListItem;
