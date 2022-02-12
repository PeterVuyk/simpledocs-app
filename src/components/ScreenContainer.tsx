import React, { FC, ReactNode, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { BlackPortal } from 'react-native-portal';
import { scrollUp } from '../redux/slice/scrollingSlice';
import { useAppDispatch } from '../redux/hooks';
import globalStyle from '../styling/globalStyle';

interface Props {
  children: ReactNode;
}

const ScreenContainer: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    // If the user clicks on a tab while the tab is hiding, then we need to make sure the tab is visible again.
    // ScrollUp with a timeout to make sure navigation is successful before we show the bottom bar again.
    setTimeout(() => dispatch(scrollUp()), 1000);
  }, [dispatch, isFocused]);

  return (
    <>
      {Platform.OS === 'ios' && (
        <BlackPortal name="goBackButton">
          <HeaderBackButton
            style={{
              opacity: navigation.canGoBack() ? 1 : 0,
              marginLeft: 10,
            }}
            tintColor={globalStyle.color.primary.main}
            pressColor={globalStyle.color.primary.main}
            onPress={() =>
              navigation.canGoBack() ? navigation.goBack() : null
            }
          />
        </BlackPortal>
      )}
      {children}
    </>
  );
};

export default ScreenContainer;
