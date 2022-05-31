import React from 'react';
import {Chat} from '../models/Chat';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatView from '../screens/chats/chatView/ChatView';
import TabNavigator from './TabNavigator';

type ChatRouteProps = {
  chat?: Chat;
  chatId: string;
};

export type RootParamList = {
  HomeTabs: undefined;
  ChatView: ChatRouteProps;
  withChat: ChatRouteProps;
};

const Stack = createNativeStackNavigator<RootParamList>();

export type RootNavigationProp = NativeStackNavigationProp<RootParamList>;

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}} initialRouteName="HomeTabs">
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
      <Stack.Screen name="ChatView" component={ChatView} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
