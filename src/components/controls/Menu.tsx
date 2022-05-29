import React, {PropsWithChildren, ReactElement} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Menu as NbMenu, Text} from 'native-base';
import CentredSpinner from '../surfaces/CentredSpinner';
import FHStack from '../boxes/FHStack';
import {SizeType} from 'native-base/lib/typescript/components/types';

export type MenuProps = PropsWithChildren<{
  trigger: (_props: any, state: {open: boolean}) => JSX.Element;
}>;

export type MenuItemProps = PropsWithChildren<{
  action: (e?: GestureResponderEvent) => void;
  icon?: ReactElement;
  iconSize?: SizeType;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
}>;

export const MenuItem = ({action, icon, iconSize, text, children, loading, disabled, show = true}: MenuItemProps) => {
  const iconElement = React.cloneElement(icon, {size: iconSize || 'sm'});

  return (
    show && (
      <NbMenu.Item onPress={action} disabled={disabled}>
        <FHStack smallSpace alignItems="center">
          {loading && <CentredSpinner size="sm" />}
          {!loading && iconElement}
          {!loading && text && <Text>{text}</Text>}
          {!loading && children}
        </FHStack>
      </NbMenu.Item>
    )
  );
};

const Menu = ({trigger, children}: MenuProps) => {
  return (
    <NbMenu defaultIsOpen={false} trigger={trigger}>
      {children}
    </NbMenu>
  );
};

export default Menu;
