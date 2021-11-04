import { IconFamilyType } from './IconFamilyType';

export default interface BottomTab {
  index: number;
  title: string;
  icon: string;
  iconFamilyType?: IconFamilyType;
  onPress: () => void;
  isSelected: boolean;
}
