import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import SignIn from '../screens/auth/signIn/SignIn';
import SignUp from '../screens/auth/signUp/SignUp';
import ForgotPassword from '../screens/auth/forgotPassword/ForgotPassword';

type AuthParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export type AuthNavigationProp = NativeStackNavigationProp<AuthParamList>;

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
