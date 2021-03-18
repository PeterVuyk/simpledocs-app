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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HideWithKeyboard from "../../components/HideWithKeyboard>";

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

  return (
    <>
      <View style={[{ flex: 1 }, contentStyle]}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
      <HideWithKeyboard>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {state.routes.map((route, index) => (
            <View key={route.key} style={[{ flex: 1 }, tabBarStyle]}>
              <TouchableOpacity
                disabled={state.index === index}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    data: {
                      isAlreadyFocused:
                        route.key === state.routes[state.index].key,
                    },
                    canPreventDefault: true,
                  });

                  if (!event.defaultPrevented) {
                    navigation.dispatch({
                      ...TabActions.jumpTo(route.name),
                      target: state.key,
                    });
                  }
                }}
                style={{
                  flex: 1,
                }}
              >
                <MaterialCommunityIcons
                  style={{
                    textAlign: 'center',
                    marginBottom: -3,
                  }}
                  name={descriptors[route.key].options.icon}
                  color={state.index === index ? '#ffffff' : '#0091EA'}
                  size={26}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: state.index === index ? '#ffffff' : '#0091EA',
                  }}
                >
                  {descriptors[route.key].options.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </HideWithKeyboard>
    </>
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
