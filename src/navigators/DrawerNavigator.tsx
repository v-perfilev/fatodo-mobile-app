import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProtectedNavigator from './ProtectedNavigator';
import withDrawer from '../shared/hocs/withDrawer';
import Sidebar from '../components/layouts/Sidebar';
import {flowRight} from 'lodash';
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import {Box} from 'native-base';
import AccountForm from '../screens/account/accountForm/AccountForm';
import AccountSettingsForm from '../screens/account/accountSettingsForm/AccountSettingsForm';
import AccountChangePasswordForm from '../screens/account/accountChangePasswordForm/AccountChangePasswordForm';
import withSafeArea from '../shared/hocs/withSafeArea';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const isActive = useAppSelector(AuthSelectors.isActive);
  const MainComponent = isActive ? ProtectedNavigator : Box;

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, lazy: false, drawerType: 'back', swipeEdgeWidth: 0}}
      drawerContent={Sidebar}
    >
      <Drawer.Screen name="Default" component={MainComponent} />
      <Drawer.Screen name="AccountForm" component={AccountForm} />
      <Drawer.Screen name="AccountSettingsForm" component={AccountSettingsForm} />
      <Drawer.Screen name="AccountChangePasswordForm" component={AccountChangePasswordForm} />
    </Drawer.Navigator>
  );
};

export default flowRight([withSafeArea, withDrawer])(DrawerNavigator);
