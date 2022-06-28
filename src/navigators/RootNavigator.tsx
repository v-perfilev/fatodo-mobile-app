import React from 'react';
import {Chat} from '../models/Chat';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatView from '../screens/chats/chatView/ChatView';
import TabNavigator from './TabNavigator';
import CommentsView from '../screens/comments/commentsView/CommentsView';
import {ColorScheme} from '../shared/themes/ThemeFactory';
import {User} from '../models/User';
import UserView from '../screens/user/userView/UserView';

type ChatRouteProps = {
  chat?: Chat;
  chatId?: string;
};

type CommentsRouteProps = {
  targetId: string;
  colorScheme?: ColorScheme;
};

type UserRouteProps = {
  user?: User;
  userId?: string;
};

export type RootParamList = {
  HomeTabs: undefined;
  ChatView: ChatRouteProps;
  CommentsView: CommentsRouteProps;
  UserView: UserRouteProps;
  withChat: ChatRouteProps;
  withComments: CommentsRouteProps;
  withUser: UserRouteProps;
};

const Stack = createNativeStackNavigator<RootParamList>();

export type RootNavigationProp = NativeStackNavigationProp<RootParamList>;

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}} initialRouteName="HomeTabs">
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
      <Stack.Screen name="ChatView" component={ChatView} />
      <Stack.Screen name="CommentsView" component={CommentsView} />
      <Stack.Screen name="UserView" component={UserView} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
