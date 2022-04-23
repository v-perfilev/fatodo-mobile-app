import React, {FC, ReactElement} from 'react';
import {GestureResponderEvent} from 'react-native';
import {HStack, Menu as NbMenu, Text} from 'native-base';
import CentredSpinner from '../surfaces/CentredSpinner';

export type MenuProps = {
  trigger: (_props: any, state: {open: boolean}) => JSX.Element;
};

export type MenuItemProps = {
  action: (e?: GestureResponderEvent) => void;
  icon?: ReactElement;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  show?: boolean;
};

export const MenuItem: FC<MenuItemProps> = ({action, icon, text, loading, disabled, show = true}) => {
  return (
    show && (
      <NbMenu.Item onPress={action} disabled={disabled}>
        <HStack space="1" alignItems="center">
          {loading && <CentredSpinner size="sm" />}
          {!loading && icon}
          {!loading && <Text>{text}</Text>}
        </HStack>
      </NbMenu.Item>
    )
  );
};

const Menu: FC<MenuProps> = ({trigger, children}) => {
  return (
    <NbMenu defaultIsOpen={false} trigger={trigger}>
      {children}
    </NbMenu>
  );
};

export default Menu;
