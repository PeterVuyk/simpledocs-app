import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Header from '../header/Header';
import { setProgressListener } from '../drawer/onProgressListener';

const Tab = createMaterialBottomTabNavigator();

const TabNavigation: React.FC = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = { borderRadius, transform: [{ scale }] };

  // mount/unmount mechanisme zorgt ervoor dat het niet elke keer wordt ingeladen.

  // TODO: autocomplete intellij

  React.useEffect(() => {
    setProgressListener((p: any) => setProgress(p));
    // TODO: update any return type
    // return () => {}  <- als je dit doet, dan is dit de unmount functie.
  }, []); // dit gebeurd on mount waanneeer het als 1e keer in de dom wordt gerenderd.

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animatedStyle]}>
      <Tab.Navigator
        initialRouteName="Regulations"
        activeColor="#ffffff"
        inactiveColor="#247dc0"
        barStyle={{ backgroundColor: '#154594' }}
      >
        <Tab.Screen
          name="DecisionTree"
          component={Header}
          initialParams={{ screenName: 'DecisionTree' }}
          options={{
            tabBarLabel: 'Beslisboom',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="tree-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Regulations"
          component={Header}
          initialParams={{ screenName: 'Regulations' }}
          options={{
            tabBarLabel: 'Regelgeving',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="book-open-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Info"
          component={Header}
          initialParams={{ screenName: 'Info' }}
          options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="information-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default TabNavigation;
