import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Center, Icon } from 'native-base';
import HideWithKeyboardView from '../../components/keyboard/HideWithKeyboardView';
import ToggleBottomNavigator from './ToggleBottomNavigator';
import BottomTab from '../../model/BottomTab';
import globalStyle from '../../styling/globalStyle';
import getFamilyIcon from '../../components/getFamilyIcon';

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
                  <Center>
                    <Icon
                      size="7"
                      color={
                        tab.isSelected
                          ? globalStyle.bottomTabLayout.tabSelection
                          : globalStyle.color.primary.light
                      }
                      as={getFamilyIcon(tab.iconFamilyType as string, tab.icon)}
                    />
                  </Center>
                  <Text
                    style={[
                      {
                        color: tab.isSelected
                          ? globalStyle.bottomTabLayout.tabSelection
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
