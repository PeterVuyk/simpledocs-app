import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import HideWithKeyboardView from '../../components/keyboard/HideWithKeyboardView';
import ToggleBottomNavigator from './ToggleBottomNavigator';
import BottomTab from '../../model/BottomTab';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: globalStyle.color.primary.main,
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
                      color: tab.isSelected
                        ? globalStyle.color.white
                        : globalStyle.color.primary.light,
                    }}
                    name={tab.icon}
                    type={tab.iconFamilyType}
                    fontSize={globalStyle.icon.size.large}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      color: tab.isSelected
                        ? globalStyle.color.white
                        : globalStyle.color.primary.light,
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
