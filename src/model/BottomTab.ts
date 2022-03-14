import { IconFamilyType } from './style/IconFamilyType';

export const FIRST_BOOK_TAB = 'firstBookTab';
export const SECOND_BOOK_TAB = 'secondBookTab';
export const THIRD_BOOK_TAB = 'thirdBookTab';

export default interface BottomTab {
  index: number;
  title: string;
  icon: string;
  iconFamilyType?: IconFamilyType;
  onPress: () => void;
  isSelected: boolean;
}
