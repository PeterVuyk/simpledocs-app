import React, { FC } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Platform, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'native-base';
import { WhitePortal } from 'react-native-portal';
import HeaderLogo from '../../navigation/header/HeaderLogo';
import DrawerButton from '../../navigation/header/DrawerButton';
import SearchButton from '../../navigation/header/search/SearchButton';
import { headerStyles } from '../../navigation/header/Header';
import globalStyle from '../../styling/globalStyle';
import LoadingSpinner from '../../components/LoadingSpinner';
import getFamilyIcon from '../../components/getFamilyIcon';

const styles = StyleSheet.create({
  bottomTabContainer: {
    backgroundColor: globalStyle.color.primary.main,
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  firstStartupText: {
    color: globalStyle.titleLayout.color,
    ...globalStyle.typography.h3,
    padding: 20,
    paddingTop: 150,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

interface Props {
  firstStartupApp: boolean;
}

const IntentSplashScreen: FC<Props> = React.memo(({ firstStartupApp }) => {
  function Header() {
    return (
      <SafeAreaView style={headerStyles.container}>
        <View style={headerStyles.box}>
          {Platform.OS === 'ios' && <WhitePortal name="goBackButton" />}
          {Platform.OS !== 'ios' && (
            <DrawerButton iconName="menu" iconType="MaterialCommunityIcons" />
          )}
        </View>
        <View style={headerStyles.logoBox}>
          <HeaderLogo />
        </View>
        <View style={[headerStyles.box, { flexDirection: 'row-reverse' }]}>
          {Platform.OS === 'ios' && (
            <DrawerButton
              iconName="dots-vertical"
              iconType="MaterialCommunityIcons"
            />
          )}
          <SearchButton />
          {/* The icon below is a placeholder and is added so the header logo doesn't jump if the bookmarkToggle is set */}
          <Icon
            size="7"
            color={globalStyle.color.white}
            style={{
              margin: 10,
              opacity: 0.0,
            }}
            as={getFamilyIcon(
              'MaterialCommunityIcons',
              'bookmark-plus-outline',
            )}
          />
        </View>
      </SafeAreaView>
    );
  }

  function FirstStartupLoader() {
    return (
      <View>
        <Text style={styles.firstStartupText}>
          De app wordt voorbereid voor het eerste gebruik...
        </Text>
        <LoadingSpinner />
      </View>
    );
  }

  function ScreenLoader() {
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
  }

  return (
    <>
      <Header />
      {firstStartupApp && <FirstStartupLoader />}
      {!firstStartupApp && <ScreenLoader />}
      <View style={styles.bottomTabContainer} />
    </>
  );
});

export default IntentSplashScreen;
