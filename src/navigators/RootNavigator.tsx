import React, {FC, ReactNode} from 'react';
import TabNavigator from './TabNavigator';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import RootNavigatorDrawer from '../components/layouts/RootNavigatorDrawer';
import Account from '../screens/account/Account';
import GroupsIcon from '../components/icons/GroupsIcon';
import AccountIcon from '../components/icons/AccountIcon';

type RootParamList = {
  Home: undefined;
  Account: undefined;
};

type RootIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const Drawer = createDrawerNavigator<RootParamList>();

export type RootNavigationProp = DrawerNavigationProp<RootParamList>;

const groupsIcon = ({color, size}: RootIconProps): ReactNode => <GroupsIcon color={color} size={size} />;
const accountIcon = ({color, size}: RootIconProps): ReactNode => <AccountIcon color={color} size={size} />;

const RootNavigator: FC = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}} drawerContent={RootNavigatorDrawer}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
          drawerIcon: groupsIcon,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerLabel: 'Account',
          drawerIcon: accountIcon,
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
