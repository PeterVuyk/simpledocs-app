import React from 'react';
import { DrawerItem as Item } from '@react-navigation/drawer';
import { Icon } from 'native-base';

interface Props {
  label: string;
  onSubmit: () => void;
  iconName: string;
  iconType:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';
}

const DrawerItem: React.FC<Props> = ({
  label,
  onSubmit,
  iconName,
  iconType,
}) => {
  return (
    <Item
      style={{
        borderTopColor: '#d4d3d3',
        borderTopWidth: 1,
        marginBottom: -5,
      }}
      label={label}
      onPress={onSubmit}
      icon={({ color }) => (
        <Icon name={iconName} style={{ color }} type={iconType} fontSize={20} />
      )}
    />
  );
};

export default DrawerItem;
