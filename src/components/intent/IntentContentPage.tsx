import React, { FC } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const IntentContentPage: FC = React.memo(() => {
  const ScreenLoader = () => {
    return (
      <ContentLoader
        backgroundColor="#dadada"
        foregroundColor="#fafafa"
        viewBox="0 230 400 400"
      >
        {/* 20 & 13 */}
        {/* title bar */}
        <Rect x="0" y="270" rx="5" ry="5" width="400" height="20" />
        {/* paragraph 1 */}
        <Rect x="10" y="306" rx="5" ry="5" width="200" height="13" />
        <Rect x="10" y="326" rx="5" ry="5" width="220" height="13" />
        <Rect x="10" y="346" rx="5" ry="5" width="300" height="13" />
        {/* paragraph 2 */}
        <Rect x="10" y="391" rx="5" ry="5" width="350" height="13" />
        <Rect x="10" y="411" rx="5" ry="5" width="300" height="13" />
        <Rect x="10" y="431" rx="5" ry="5" width="280" height="13" />
        <Rect x="10" y="451" rx="5" ry="5" width="330" height="13" />
        <Rect x="10" y="471" rx="5" ry="5" width="320" height="13" />
        <Rect x="10" y="491" rx="5" ry="5" width="220" height="13" />
        {/* title bar */}
        <Rect x="0" y="524" rx="5" ry="5" width="400" height="20" />
        {/* bullets */}
        <Rect x="10" y="560" rx="5" ry="5" width="300" height="13" />
        <Rect x="20" y="595" rx="5" ry="5" width="5" height="5" />
        <Rect x="40" y="590" rx="5" ry="5" width="80" height="13" />
        <Rect x="20" y="615" rx="5" ry="5" width="5" height="5" />
        <Rect x="40" y="610" rx="5" ry="5" width="40" height="13" />
        <Rect x="20" y="635" rx="5" ry="5" width="5" height="5" />
        <Rect x="40" y="630" rx="5" ry="5" width="60" height="13" />
      </ContentLoader>
    );
  };

  return (
    <>
      <ScreenLoader />
    </>
  );
});

export default IntentContentPage;
