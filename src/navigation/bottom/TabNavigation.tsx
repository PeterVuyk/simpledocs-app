import * as React from 'react';
import Animated from 'react-native-reanimated';
import RegulationStackNavigator from '../StackNavigator/RegulationStackNavigator';
import InfoStackNavigator from '../StackNavigator/InfoStackNavigator';
import DecisionTreeStackNavigator from '../StackNavigator/DecisionTreeStackNavigator';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';

const Tab = TabNavigator();

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

  React.useEffect(() => {
    setDrawerProgressListener((updatedProgress: Animated.Value<0>) =>
      setProgress(updatedProgress),
    );
  }, []);

  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animatedStyle]}>
      <Tab.Navigator
        tabBarStyle={{
          paddingBottom: 5,
          paddingTop: 5,
          height: 50,
          backgroundColor: '#154594',
        }}
        contentStyle={{
          height: 60,
        }}
        initialRouteName="RegulationsScreenStack"
      >
        <Tab.Screen
          name="DecisionTreeScreenStack"
          component={DecisionTreeStackNavigator}
          options={{
            title: 'Beslisboom',
            icon: 'tree-outline',
          }}
        />
        <Tab.Screen
          name="RegulationsScreenStack"
          component={RegulationStackNavigator}
          options={{
            title: 'Regelgeving',
            icon: 'book-open-outline',
          }}
        />
        <Tab.Screen
          name="InfoScreenStack"
          component={InfoStackNavigator}
          options={{
            title: 'Info',
            icon: 'information-outline',
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default TabNavigation;
