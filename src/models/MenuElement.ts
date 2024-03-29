import {ReactElement} from 'react';
import {ColorSchemeType} from 'native-base/lib/typescript/components/types';

export interface MenuElement {
  icon: ReactElement;
  action: () => void;
  color?: ColorSchemeType;
  disabled?: boolean;
  hidden?: boolean;
  loading?: boolean;
}
