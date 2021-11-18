import React, { FC } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-elements';
import globalStyle from '../styling/globalStyle';

interface Props {
  id: string;
  title: string;
  isSelected: boolean;
  onPress: (title: string) => void;
  width: number;
}

const NavigatorChip: FC<Props> = ({
  id,
  title,
  isSelected,
  onPress,
  width,
}) => {
  return (
    <View key={title} style={{ padding: 2 }}>
      <Chip
        title={title}
        titleStyle={[
          isSelected
            ? { color: globalStyle.color.white }
            : { color: globalStyle.color.primary.main },
        ]}
        type={isSelected ? 'solid' : 'outline'}
        onPress={() => onPress(id)}
        buttonStyle={{ width }}
      />
    </View>
  );
};

export default NavigatorChip;
