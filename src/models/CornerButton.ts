import {ReactElement} from 'react';
import {ColorSchemeType} from 'native-base/lib/typescript/components/types';

export interface CornerButton {
  icon: ReactElement;
  action: () => void;
  color?: ColorSchemeType;
  hideOnTop?: boolean;
  hideOnScroll?: boolean;
  hidden?: boolean;
}
