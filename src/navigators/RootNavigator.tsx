import React, {memo} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import AuthNavigator, {AuthParamList} from './AuthNavigator';
import DrawerNavigator, {DrawerParamList} from './DrawerNavigator';
import UnhealthyPlaceholder from '../components/layouts/UnhealthyPlaceholder';

export type NavigationProps<ParamList> = {
  screen: keyof ParamList;
  params: ParamList[keyof ParamList];
};

export type RootParamList = {
  Unhealthy: undefined;
  Public: NavigationProps<AuthParamList>;
  Protected: NavigationProps<DrawerParamList>;
};

const Stack = createNativeStackNavigator<RootParamList>();

export type RootNavigationProps = NativeStackNavigationProp<RootParamList>;

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const appStatus = useAppSelector(AuthSelectors.appStatus);
  const account = useAppSelector(AuthSelectors.account);

  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
      {appStatus !== 'READY' ? (
        <Stack.Screen name="Unhealthy" component={UnhealthyPlaceholder} />
      ) : isAuthenticated && account ? (
        <Stack.Screen name="Protected" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Public" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default memo(RootNavigator);
