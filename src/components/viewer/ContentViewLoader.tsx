import React, { FC } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const ContentViewLoader: FC = () => {
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <ContentLoader viewBox="10 38 300 100" backgroundColor="#dadada">
        <Rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
        <Rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
        <Rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
        <Rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
        <Rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
        <Rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
        <Rect x="0" y="120" rx="3" ry="3" width="250" height="10" />
        <Rect x="20" y="140" rx="3" ry="3" width="220" height="10" />
        <Rect x="20" y="160" rx="3" ry="3" width="170" height="10" />
        <Rect x="0" y="180" rx="3" ry="3" width="250" height="10" />
        <Rect x="20" y="200" rx="3" ry="3" width="200" height="10" />
        <Rect x="20" y="220" rx="3" ry="3" width="80" height="10" />
        <Rect x="0" y="240" rx="3" ry="3" width="250" height="10" />
        <Rect x="20" y="260" rx="3" ry="3" width="220" height="10" />
        <Rect x="20" y="280" rx="3" ry="3" width="170" height="10" />
        <Rect x="0" y="300" rx="3" ry="3" width="250" height="10" />
        <Rect x="20" y="320" rx="3" ry="3" width="200" height="10" />
        <Rect x="20" y="340" rx="3" ry="3" width="80" height="10" />
      </ContentLoader>
    </View>
  );
};

export default ContentViewLoader;
