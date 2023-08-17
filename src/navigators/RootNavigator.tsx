import React, {memo} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import AuthNavigator, {AuthParamList} from './AuthNavigator';
import DrawerNavigator, {DrawerParamList} from './DrawerNavigator';
import LoaderScreen from '../components/layouts/LoaderScreen';
import UnhealthyScreen from '../components/layouts/UnhealthyScreen';

export type NavigationProps<ParamList> = {
  screen: keyof ParamList;
  params: ParamList[keyof ParamList];
};

export type RootParamList = {
  Pending: undefined;
  Unhealthy: undefined;
  Public: NavigationProps<AuthParamList>;
  Protected: NavigationProps<DrawerParamList>;
};

const Stack = createNativeStackNavigator<RootParamList>();

export type RootNavigationProps = NativeStackNavigationProp<RootParamList>;

const RootNavigator = () => {
  const navigatorState = useAppSelector(AuthSelectors.navigatorState);

  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
      {navigatorState === 'PENDING' && <Stack.Screen name="Pending" component={LoaderScreen} />}
      {navigatorState === 'UNHEALTHY' && <Stack.Screen name="Unhealthy" component={UnhealthyScreen} />}
      {navigatorState === 'PUBLIC' && <Stack.Screen name="Public" component={AuthNavigator} />}
      {navigatorState === 'PROTECTED' && <Stack.Screen name="Protected" component={DrawerNavigator} />}
    </Stack.Navigator>
  );
};

export default memo(RootNavigator);
