import React, { FC } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-elements';

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
        titleStyle={[isSelected ? { color: '#fff' } : { color: '#154594' }]}
        type={isSelected ? 'solid' : 'outline'}
        onPress={() => onPress(id)}
        buttonStyle={{ width }}
      />
    </View>
  );
};

export default NavigatorChip;
