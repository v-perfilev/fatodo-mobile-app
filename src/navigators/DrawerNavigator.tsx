import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProtectedNavigator, {ProtectedParamList} from './ProtectedNavigator';
import withDrawer from '../shared/hocs/withDrawer';
import Sidebar from '../components/layouts/Sidebar';
import {flowRight} from 'lodash';
import AccountForm from '../screens/account/accountForm/AccountForm';
import AccountSettingsForm from '../screens/account/accountSettingsForm/AccountSettingsForm';
import AccountChangePasswordForm from '../screens/account/accountChangePasswordForm/AccountChangePasswordForm';
import withSafeArea from '../shared/hocs/withSafeArea';
import {NavigationProps} from './RootNavigator';

export type DrawerParamList = {
  Default: NavigationProps<ProtectedParamList>;
  AccountForm: undefined;
  AccountSettingsForm: undefined;
  AccountChangePasswordForm: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, lazy: false, drawerType: 'back', swipeEdgeWidth: 0}}
      drawerContent={Sidebar}
    >
      <Drawer.Screen name="Default" component={ProtectedNavigator} />
      <Drawer.Screen name="AccountForm" component={AccountForm} />
      <Drawer.Screen name="AccountSettingsForm" component={AccountSettingsForm} />
      <Drawer.Screen name="AccountChangePasswordForm" component={AccountChangePasswordForm} />
    </Drawer.Navigator>
  );
};

export default flowRight([withSafeArea, withDrawer])(DrawerNavigator);
