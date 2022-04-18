import {ReactElement} from 'react';
import {ColorType} from 'native-base/lib/typescript/components/types';

export interface MenuElement {
  icon: ReactElement;
  action: () => void;
  text: string;
  color?: ColorType;
  disabled?: boolean;
  hidden?: boolean;
  loading?: boolean;
}
