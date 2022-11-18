import React, {memo} from 'react';
import {Chat} from '../models/Chat';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatView from '../screens/chats/chatView/ChatView';
import TabNavigator, {TabParamList} from './TabNavigator';
import CommentList from '../screens/comments/commentList/CommentList';
import {ColorScheme} from '../shared/themes/ThemeFactory';
import {User} from '../models/User';
import UserView from '../screens/user/userView/UserView';
import {flowRight} from 'lodash';

export type NavigationProps<ParamList> = {
  screen: keyof ParamList;
  params: ParamList[keyof ParamList];
};

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

export type ProtectedParamList = {
  HomeTabs: NavigationProps<TabParamList>;
  ChatView: ChatRouteProps;
  CommentList: CommentsRouteProps;
  UserView: UserRouteProps;
  withChat: ChatRouteProps;
  withComments: CommentsRouteProps;
  withUser: UserRouteProps;
};

const Stack = createNativeStackNavigator<ProtectedParamList>();

export type ProtectedNavigationProp = NativeStackNavigationProp<ProtectedParamList>;

const ProtectedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_bottom'}} initialRouteName={'HomeTabs'}>
      <Stack.Screen name="HomeTabs" component={TabNavigator} />
      <Stack.Screen name="ChatView" component={ChatView} />
      <Stack.Screen name="CommentList" component={CommentList} />
      <Stack.Screen name="UserView" component={UserView} />
    </Stack.Navigator>
  );
};

export default flowRight([memo])(ProtectedNavigator);
