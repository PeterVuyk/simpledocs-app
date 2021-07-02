import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from 'native-base';
import ArticleListOverlay from '../../overlay/ArticleListOverlay';
import { ArticleType } from '../../model/ArticleType';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
  },
});

interface Props {
  articleType: ArticleType;
  articleButtonStyle: StyleProp<ViewStyle>;
}

const ArticleListButton: FC<Props> = ({ articleType, articleButtonStyle }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      {!visible && (
        <Icon
          style={[styles.buttonColor, articleButtonStyle]}
          name="book-open-variant"
          type="MaterialCommunityIcons"
          fontSize={26}
          onPress={toggleOverlay}
        />
      )}
      {visible && (
        <ArticleListOverlay
          articleType={articleType}
          toggleOverlay={toggleOverlay}
        />
      )}
    </View>
  );
};

export default ArticleListButton;
