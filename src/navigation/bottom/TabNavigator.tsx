import React from 'react';
import {
  StyleProp,
  ViewStyle,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
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
import { Icon } from 'native-base';
import HideWithKeyboardView from '../../components/HideWithKeyboardView';
import ToggleBottomNavigator from '../../navigation/bottom/ToggleBottomNavigator';

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title: string;
  icon: string;
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
type Props = DefaultNavigatorOptions<TabNavigationOptions> &
  TabRouterOptions &
  TabNavigationConfig;

function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
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

  const onTabPress = route => {
    if (route.name === 'RegulationsScreenStack') {
      navigation.setParams({ params: null, screen: null });
      navigation.navigate('RegulationsScreenStack', {
        screen: 'RegulationsScreen',
      });
      return;
    }

    if (route.name === 'DecisionsScreenStack') {
      navigation.setParams({ params: null, screen: null });
      navigation.navigate('DecisionsScreenStack', {
        screen: 'DecisionsScreen',
      });
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      data: {
        isAlreadyFocused: route.key === state.routes[state.index].key,
      },
      canPreventDefault: true,
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
        {descriptors[state.routes[state.index].key].render()}
      </View>
      <HideWithKeyboardView>
        <ToggleBottomNavigator>
          {state.routes.map((route, index) => (
            <View key={route.key} style={[{ flex: 1 }, tabBarStyle]}>
              <TouchableOpacity
                onPress={() => onTabPress(route)}
                style={{
                  flex: 1,
                }}
              >
                <Icon
                  style={{
                    textAlign: 'center',
                    color: state.index === index ? '#fff' : '#4bb1fc',
                  }}
                  name={descriptors[route.key].options.icon}
                  type="MaterialCommunityIcons"
                  fontSize={26}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: state.index === index ? '#fff' : '#4bb1fc',
                  }}
                >
                  {descriptors[route.key].options.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ToggleBottomNavigator>
      </HideWithKeyboardView>
    </>
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
