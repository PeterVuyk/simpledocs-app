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
import HideWithKeyboardView from '../../components/keyboard/HideWithKeyboardView';
import ToggleBottomNavigator from '../../navigation/bottom/ToggleBottomNavigator';
import { IconFamilyType } from '../../model/IconFamilyType';

// Props accepted by the view
type TabNavigationConfig = {
  tabBarStyle: StyleProp<ViewStyle>;
  contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title: string;
  icon: string;
  iconFamilyType?: IconFamilyType;
  showInBottomBar: boolean;
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
      navigation.navigate('RegulationsScreenStack', {
        screen: 'RegulationsScreen',
      });
      return;
    }

    if (route.name === 'InstructionManualStack') {
      navigation.navigate('InstructionManualStack', {
        screen: 'InstructionManualScreen',
      });
      return;
    }

    if (route.name === 'DecisionsScreenStack') {
      navigation.navigate('DecisionsScreenStack', {
        screen: 'DecisionsScreen',
      });
      return;
    }

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
      <HideWithKeyboardView>
        <ToggleBottomNavigator>
          {state.routes
            .filter(route => descriptors[route.key].options.showInBottomBar)
            .map((route, index) => (
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
                    type={
                      descriptors[route.key].options.iconFamilyType ??
                      'MaterialCommunityIcons'
                    }
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
