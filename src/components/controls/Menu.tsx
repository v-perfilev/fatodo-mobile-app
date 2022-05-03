import React, {PropsWithChildren, ReactElement} from 'react';
import {GestureResponderEvent} from 'react-native';
import {HStack, Menu as NbMenu, Text} from 'native-base';
import CentredSpinner from '../surfaces/CentredSpinner';

export type MenuProps = PropsWithChildren<{
  trigger: (_props: any, state: {open: boolean}) => JSX.Element;
}>;

export type MenuItemProps = PropsWithChildren<{
  action: (e?: GestureResponderEvent) => void;
  icon?: ReactElement;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
}>;

export const MenuItem = ({action, icon, text, children, loading, disabled, show = true}: MenuItemProps) => {
  return (
    show && (
      <NbMenu.Item onPress={action} disabled={disabled}>
        <HStack space="1" alignItems="center">
          {loading && <CentredSpinner size="sm" />}
          {!loading && icon}
          {!loading && <Text>{text}</Text>}
          {!loading && children}
        </HStack>
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
