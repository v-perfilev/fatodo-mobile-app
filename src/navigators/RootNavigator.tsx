import React, {ReactNode} from 'react';
import TabNavigator from './TabNavigator';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';
import RootNavigatorDrawer from '../components/layouts/RootNavigatorDrawer';
import Account from '../screens/account/Account';
import GroupsIcon from '../components/icons/GroupsIcon';
import AccountIcon from '../components/icons/AccountIcon';
import {flowRight} from 'lodash';
import withDrawer from '../shared/hocs/withDrawer';
import {useTheme} from 'native-base';

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

const RootNavigator = () => {
  const theme = useTheme();

  const drawerStyle = {
    backgroundColor: theme.colors.gray['100'],
  };

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, drawerType: 'back', drawerStyle}}
      drawerContent={RootNavigatorDrawer}
    >
      <Drawer.Screen name="Home" component={TabNavigator} options={{drawerIcon: groupsIcon}} />
      <Drawer.Screen name="Account" component={Account} options={{drawerIcon: accountIcon}} />
    </Drawer.Navigator>
  );
};

export default flowRight([withDrawer])(RootNavigator);
