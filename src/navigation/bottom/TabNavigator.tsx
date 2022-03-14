import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import {
  useNavigationBuilder,
  DefaultNavigatorOptions,
  TabRouter,
  TabActions,
  TabActionHelpers,
  TabRouterOptions,
  TabNavigationState,
  createNavigatorFactory,
  ParamListBase,
} from '@react-navigation/native';
import { IconFamilyType } from '../../model/style/IconFamilyType';
import BottomTabs from './BottomTabs';

// Props accepted by the view
type TabNavigationConfig = {
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title: string;
  icon: string;
  iconFamilyType?: IconFamilyType;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  contentStyle,
}: Props) {
  const { state, navigation, descriptors } = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    TabActionHelpers<ParamListBase>,
    TabNavigationOptions,
    TabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  // @ts-ignore
  const onTabPress = route => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
      data: {
        isAlreadyFocused: route.key === state.routes[state.index].key,
      },
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({
        ...TabActions.jumpTo(route.name),
        target: state.key,
      });
    }
  };

  return (
    <>
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={[
                { flex: 1 },
                { display: i === state.index ? 'flex' : 'none' },
              ]}
            >
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </View>
      <BottomTabs
        tabs={state.routes.map((route, index) => {
          return {
            index,
            title: descriptors[route.key].options.title,
            icon: descriptors[route.key].options.icon,
            iconFamilyType: descriptors[route.key].options.iconFamilyType,
            onPress: () => onTabPress(route),
            isSelected: state.index === index,
          };
        })}
      />
    </>
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
