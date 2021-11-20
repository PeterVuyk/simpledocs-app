import React, { FC } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

const IntentSearchScreenListPage: FC = React.memo(() => {
  const ScreenLoader = () => {
    return (
      <ContentLoader
        backgroundColor="#dadada"
        foregroundColor="#fafafa"
        viewBox="0 230 400 400"
      >
        {/* ListItem 1 */}
        <Rect x="90" y="270" rx="5" ry="5" width="260" height="15" />
        <Rect x="90" y="294" rx="5" ry="5" width="200" height="9" />
        <Rect x="20" y="265" rx="0" ry="0" width="50" height="50" />
        {/* ListItem 2 */}
        <Rect x="90" y="353" rx="5" ry="5" width="160" height="15" />
        <Rect x="90" y="377" rx="5" ry="5" width="140" height="9" />
        <Rect x="20" y="348" rx="0" ry="0" width="50" height="50" />
        {/* ListItem 3 */}
        <Rect x="90" y="436" rx="5" ry="5" width="230" height="15" />
        <Rect x="90" y="460" rx="5" ry="5" width="180" height="9" />
        <Rect x="20" y="431" rx="0" ry="0" width="50" height="50" />
      </ContentLoader>
    );
  };

  return (
    <>
      <ScreenLoader />
    </>
  );
});

export default IntentSearchScreenListPage;
