import React, { FC } from 'react';
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';

const getFamilyIcon = (iconFamilyType: string, name: string) => {
  const iconName = name as any; // To avoid TS errors we set it to any.
  switch (iconFamilyType) {
    case 'AntDesign':
      return <AntDesign name={iconName} />;
    case 'Entypo':
      return <Entypo name={iconName} />;
    case 'EvilIcons':
      return <EvilIcons name={iconName} />;
    case 'Feather':
      return <Feather name={iconName} />;
    case 'FontAwesome':
      return <FontAwesome name={iconName} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={iconName} />;
    case 'Foundation':
      return <Foundation name={iconName} />;
    case 'Ionicons':
      return <Ionicons name={iconName} />;
    case 'MaterialIcons':
      return <MaterialIcons name={iconName} />;
    case 'Octicons':
      return <Octicons name={iconName} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={iconName} />;
    case 'Zocial':
      return <Zocial name={iconName} />;
    case 'MaterialCommunityIcons':
    default:
      return <MaterialCommunityIcons name={iconName} />;
  }
};

export default getFamilyIcon;
