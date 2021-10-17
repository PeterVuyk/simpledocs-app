import React, { FC } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Platform, SafeAreaView, View } from 'react-native';
import HeaderLogo from '../../navigation/header/HeaderLogo';
import DrawerButton from '../../navigation/header/DrawerButton';
import SearchButton from '../../navigation/header/SearchButton';
import { headerStyles } from '../../navigation/header/Header';

const SynchronizationSplashScreen: FC = () => {
  const Header = () => {
    return (
      <SafeAreaView style={headerStyles.container}>
        {Platform.OS !== 'ios' && (
          <DrawerButton iconName="menu" iconType="MaterialCommunityIcons" />
        )}
        <HeaderLogo />
        <View style={headerStyles.rightContainer}>
          {Platform.OS === 'ios' && (
            <DrawerButton
              iconName="dots-vertical"
              iconType="MaterialCommunityIcons"
            />
          )}
          <SearchButton />
        </View>
      </SafeAreaView>
    );
  };

  const ScreenLoader = () => {
    return (
      <ContentLoader
        backgroundColor="#dadada"
        foregroundColor="#fafafa"
        viewBox="0 150 400 400"
      >
        {/* TitleBar */}
        <Rect x="0" y="254" rx="0" ry="0" width="400" height="1" />
        <Rect x="90" y="135" rx="0" ry="0" width="220" height="24" />
        <Rect x="65" y="185" rx="0" ry="0" width="270" height="9" />
        <Rect x="40" y="205" rx="0" ry="0" width="320" height="9" />
        <Rect x="80" y="225" rx="0" ry="0" width="240" height="9" />
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
        {/* ListItem 4 */}
        <Rect x="90" y="519" rx="5" ry="5" width="220" height="15" />
        <Rect x="90" y="543" rx="5" ry="5" width="160" height="9" />
        <Rect x="20" y="514" rx="0" ry="0" width="50" height="50" />
        {/* ListItem 5 */}
        <Rect x="90" y="602" rx="5" ry="5" width="220" height="15" />
        <Rect x="90" y="626" rx="5" ry="5" width="200" height="9" />
        <Rect x="20" y="597" rx="0" ry="0" width="50" height="50" />
      </ContentLoader>
    );
  };

  return (
    <>
      <Header />
      <ScreenLoader />
    </>
  );
};

export default SynchronizationSplashScreen;