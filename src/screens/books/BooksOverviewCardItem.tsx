import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { BookInfo } from '../../model/configurations/AppConfigurations';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
  },
  title: {
    ...globalStyle.typography.h4,
    marginBottom: 5,
  },
  subTitle: {
    color: globalStyle.color.default.dark,
  },
});

interface Props {
  onNavigation: (bookType: string) => void;
  bookInfo: BookInfo;
  lastItem: boolean;
}

const BooksOverviewCardItem: FC<Props> = ({
  lastItem,
  onNavigation,
  bookInfo,
}) => {
  const getImage = () => {
    return (
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'center',
        }}
        source={{
          uri: bookInfo.imageFile,
        }}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => onNavigation(bookInfo.bookType)}
      >
        {getImage()}
        <View
          style={{
            paddingLeft: 10,
            flex: 1,
          }}
        >
          <Text style={styles.title}>{bookInfo.title}</Text>
          <Text style={styles.subTitle}>{bookInfo.subTitle}</Text>
        </View>
      </TouchableOpacity>
      {!lastItem && (
        <Divider
          color={globalStyle.color.default.light}
          width={0.5}
          style={{ margin: 5 }}
        />
      )}
    </>
  );
};

export default BooksOverviewCardItem;
