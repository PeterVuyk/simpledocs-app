import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import HideWithKeyboardView from '../../components/keyboard/HideWithKeyboardView';
import ToggleBottomNavigator from './ToggleBottomNavigator';
import BottomTab from '../../model/BottomTab';

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#154594',
  },
  tabContainer: {
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
});

interface Props {
  tabs: BottomTab[];
}

const BottomTabs: FC<Props> = ({ tabs }) => {
  return (
    <HideWithKeyboardView>
      <ToggleBottomNavigator>
        <View style={styles.tabsContainer}>
          {tabs
            .sort((a, b) => a.index - b.index)
            .map(tab => (
              <View key={tab.title} style={[{ flex: 1 }, styles.tabContainer]}>
                <TouchableOpacity
                  onPress={() => tab.onPress()}
                  style={{
                    flex: 1,
                  }}
                >
                  <Icon
                    style={{
                      textAlign: 'center',
                      color: tab.isSelected ? '#fff' : '#5bb5f6',
                    }}
                    name={tab.icon}
                    type={tab.iconFamilyType}
                    fontSize={26}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: tab.isSelected ? '#fff' : '#5bb5f6',
                    }}
                  >
                    {tab.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ToggleBottomNavigator>
    </HideWithKeyboardView>
  );
};

export default BottomTabs;
