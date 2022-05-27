import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatList from '../screens/chats/chatList/ChatList';
import ChatView from '../screens/chats/chatView/ChatView';
import {Chat} from '../models/Chat';

export type ChatParamList = {
  ChatList: undefined;
  ChatView: {chat: Chat};
};

const Stack = createNativeStackNavigator<ChatParamList>();

export type ChatNavigationProp = NativeStackNavigationProp<ChatParamList>;

const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatView" component={ChatView} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
