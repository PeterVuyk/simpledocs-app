import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleProp, View, ViewStyle } from 'react-native';
import RegulationListOverlay from '../../overlay/RegulationListOverlay';

interface Props {
  regulationsButtonStyle: StyleProp<ViewStyle>;
}

const RegulationsListButton: React.FC<Props> = ({ regulationsButtonStyle }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <MaterialCommunityIcons
        style={regulationsButtonStyle}
        name="book-open-variant"
        color="#154594"
        size={26}
        onPress={toggleOverlay}
      />
      <RegulationListOverlay
        visible={visible}
        toggleOverlay={toggleOverlay}
      />
    </View>
  );
};

export default RegulationsListButton;
