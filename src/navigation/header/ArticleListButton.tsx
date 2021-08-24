import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'native-base';
import ArticleListOverlay from '../../overlay/ArticleListOverlay';

const styles = StyleSheet.create({
  buttonColor: {
    color: '#154594',
    padding: 10,
  },
});

interface Props {
  bookType: string;
}

const ArticleListButton: FC<Props> = ({ bookType }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      {!visible && (
        <Icon
          style={styles.buttonColor}
          name="book-open-variant"
          type="MaterialCommunityIcons"
          fontSize={26}
          onPress={toggleOverlay}
        />
      )}
      {visible && (
        <ArticleListOverlay bookType={bookType} toggleOverlay={toggleOverlay} />
      )}
    </View>
  );
};

export default ArticleListButton;
