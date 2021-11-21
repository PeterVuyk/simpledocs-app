import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import HideWithKeyboardView from '../../components/keyboard/HideWithKeyboardView';
import ToggleBottomNavigator from './ToggleBottomNavigator';
import BottomTab from '../../model/BottomTab';
import globalStyle from '../../styling/globalStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: globalStyle.color.primary.main,
  },
  tabContainer: {
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
  tabTitle: {
    ...globalStyle.typography.h5,
    textAlign: 'center',
  },
});

interface Props {
  tabs: BottomTab[];
}

const BottomTabs: FC<Props> = ({ tabs }) => {
  return (
    <HideWithKeyboardView>
      <ToggleBottomNavigator>
        <View style={styles.container}>
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
                  />
                  <Text
                    style={[
                      {
                        color: tab.isSelected
                          ? globalStyle.color.white
                          : globalStyle.color.primary.light,
                      },
                      styles.tabTitle,
                    ]}
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
