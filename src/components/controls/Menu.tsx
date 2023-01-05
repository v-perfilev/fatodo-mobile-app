import React, {PropsWithChildren, ReactElement} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Menu as NbMenu, Text} from 'native-base';
import CentredSpinner from '../surfaces/CentredSpinner';
import FHStack from '../boxes/FHStack';
import IconButton from './IconButton';
import DotsVerticalIcon from '../icons/DotsVerticalIcon';
import {ColorScheme, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../../shared/themes/ThemeProvider';

export type MenuProps = PropsWithChildren<{
  trigger: (_props: any, state: {open: boolean}) => JSX.Element;
  menuItems?: MenuItemProps[];
  color?: ColorScheme;
}>;

export type MenuItemProps = PropsWithChildren<{
  action: (e?: GestureResponderEvent) => void;
  icon?: ReactElement;
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}>;

export const MenuTrigger =
  (size = '2xl', colorScheme?: ColorScheme) =>
  (triggerProps: any) =>
    <IconButton {...triggerProps} size={size} colorScheme={colorScheme} icon={<DotsVerticalIcon />} />;

export const MenuItem = ({action, icon, text, children, loading, disabled, hidden = false}: MenuItemProps) => {
  return (
    !hidden && (
      <NbMenu.Item h="40px" m="0" p="0" onPress={action} disabled={disabled} _pressed={{bg: 'primary.800:alpha.20'}}>
        <FHStack m="0" p="0" h="40px" space="2" alignItems="center">
          {loading && <CentredSpinner size="sm" />}
          {!loading && icon}
          {!loading && text && <Text>{text}</Text>}
          {!loading && children}
        </FHStack>
      </NbMenu.Item>
    )
  );
};

const Menu = ({trigger, menuItems, color, children}: MenuProps) => {
  const showMenu = children || menuItems?.filter((menuElement) => !menuElement.hidden).length > 0;

  return showMenu ? (
    <NbMenu defaultIsOpen={false} trigger={trigger} borderRadius="xl" p="0" overflow="hidden">
      <ThemeProvider theme={ThemeFactory.getTheme(color)} colorNotSet={!color}>
        {children}
        {menuItems?.map((itemProps, index) => (
          <MenuItem {...itemProps} key={index} />
        ))}
      </ThemeProvider>
    </NbMenu>
  ) : null;
};

export default Menu;
