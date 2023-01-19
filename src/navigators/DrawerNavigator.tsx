import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProtectedNavigator, {ProtectedParamList} from './ProtectedNavigator';
import withDrawer from '../shared/hocs/withDrawer';
import Sidebar from '../components/layouts/Sidebar';
import {flowRight} from 'lodash';
import withSafeArea from '../shared/hocs/withSafeArea';
import {NavigationProps} from './RootNavigator';
import AccountMain from '../screens/account/accountMain/AccountMain';
import AccountSettings from '../screens/account/accountSettings/AccountSettings';
import AccountChangePassword from '../screens/account/accountChangePassword/AccountChangePassword';

export type DrawerParamList = {
  Default: NavigationProps<ProtectedParamList>;
  AccountMain: undefined;
  AccountSettings: undefined;
  AccountChangePassword: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, lazy: false, drawerType: 'back', swipeEdgeWidth: 0}}
      drawerContent={Sidebar}
    >
      <Drawer.Screen name="Default" component={ProtectedNavigator} />
      <Drawer.Screen name="AccountMain" component={AccountMain} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
      <Drawer.Screen name="AccountChangePassword" component={AccountChangePassword} />
    </Drawer.Navigator>
  );
};

export default flowRight([withSafeArea, withDrawer])(DrawerNavigator);
