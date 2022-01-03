import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Content } from 'native-base';
import { Divider } from 'react-native-elements';
import { BookInfo } from '../../model/configurations/AppConfigurations';
import globalStyle from '../../styling/globalStyle';
import SVGIcon from '../../components/SVGIcon';
import { SVG_ICON_TYPE_BOOK_ITEM } from '../../model/style/SVGIconType';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
  },
  title: { ...globalStyle.typography.h4, marginBottom: 5 },
  subTitle: { color: globalStyle.color.default.dark },
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
  const getFigure = () => {
    if (bookInfo.iconFile) {
      return (
        <>
          <SVGIcon
            svgIconType={SVG_ICON_TYPE_BOOK_ITEM}
            iconBlob={bookInfo.iconFile}
          />
        </>
      );
    }
    if (bookInfo.imageFile) {
      return (
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
          }}
          source={{
            uri: bookInfo.imageFile,
          }}
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => onNavigation(bookInfo.bookType)}
      >
        {getFigure()}
        <Content style={{ paddingLeft: 10 }}>
          <Text style={styles.title}>{bookInfo.title}</Text>
          <Text style={styles.subTitle}>{bookInfo.subTitle}</Text>
        </Content>
      </TouchableOpacity>
      {!lastItem && <Divider width={1} style={{ margin: 10 }} />}
    </>
  );
};

export default BooksOverviewCardItem;
