import React, { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Icon } from 'native-base';
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
      {!visible && (
        <Icon
          style={[{ color: '#154594' }, regulationsButtonStyle]}
          name="book-open-variant"
          type="MaterialCommunityIcons"
          fontSize={26}
          onPress={toggleOverlay}
        />
      )}
      {visible && <RegulationListOverlay toggleOverlay={toggleOverlay} />}
    </View>
  );
};

export default RegulationsListButton;
