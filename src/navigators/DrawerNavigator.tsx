import React, {memo} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RootNavigator from './RootNavigator';
import withDrawer from '../shared/hocs/withDrawer';
import AccountForm from '../screens/account/accountForm/AccountForm';
import AccountChangePasswordForm from '../screens/account/accountChangePasswordForm/AccountChangePasswordForm';
import Sidebar from '../components/layouts/Sidebar';
import AccountSettingsForm from '../screens/account/accountSettingsForm/AccountSettingsForm';
import {flowRight} from 'lodash';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false, drawerType: 'back', lazy: false}} drawerContent={Sidebar}>
      <Drawer.Screen name="Default" component={RootNavigator} />
      <Drawer.Screen name="AccountForm" component={AccountForm} />
      <Drawer.Screen name="AccountSettingsForm" component={AccountSettingsForm} />
      <Drawer.Screen name="AccountChangePasswordForm" component={AccountChangePasswordForm} />
    </Drawer.Navigator>
  );
};

export default flowRight([memo, withDrawer])(DrawerNavigator);
