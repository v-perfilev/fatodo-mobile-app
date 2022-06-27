import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import AccountView from '../screens/account/accountView/AccountView';
import AccountForm from '../screens/account/accountForm/AccountForm';

export type AccountParamList = {
  AccountView: undefined;
  AccountForm: undefined;
};

const Stack = createNativeStackNavigator<AccountParamList>();

export type AccountNavigationProp = NativeStackNavigationProp<AccountParamList>;

const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="AccountView">
      <Stack.Screen name="AccountView" component={AccountView} />
      <Stack.Screen name="AccountForm" component={AccountForm} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
