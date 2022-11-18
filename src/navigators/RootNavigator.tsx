import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

type RootParamList = {
  Public: undefined;
  Protected: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

const RootNavigator = () => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
      {isAuthenticated ? (
        <Stack.Screen name="Protected" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Public" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default memo(RootNavigator);
