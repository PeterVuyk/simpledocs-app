import * as React from 'react';
import Animated from 'react-native-reanimated';
import RegulationStackNavigator from '../StackNavigator/RegulationStackNavigator';
import StackNavigator from '../StackNavigator/StackNavigator';
import { setDrawerProgressListener } from '../drawer/onDrawerProgressListener';
import TabNavigator from './TabNavigator';
import DecisionsStackNavigator from '../StackNavigator/DecisionsStackNavigator';
import InstructionManualStackNavigator from '../StackNavigator/InstructionManualStackNavigator';

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
          height: 60,
          backgroundColor: '#154594',
        }}
        contentStyle={{
          height: 60,
        }}
        initialRouteName="RegulationsScreenStack"
      >
        <Tab.Screen
          name="InstructionManualStack"
          component={InstructionManualStackNavigator}
          options={{
            title: 'Handboek',
            icon: 'graduation',
            iconFamilyType: 'SimpleLineIcons',
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="RegulationsScreenStack"
          component={RegulationStackNavigator}
          options={{
            title: 'Regelgeving',
            icon: 'book-open-outline',
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="DecisionsScreenStack"
          component={DecisionsStackNavigator}
          options={{
            title: 'Afwegingen',
            icon: 'arrow-decision',
            showInBottomBar: true,
          }}
        />
        <Tab.Screen
          name="ScreenStack"
          component={StackNavigator}
          options={{
            title: 'Info',
            icon: 'information-outline',
            showInBottomBar: false,
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default TabNavigation;
