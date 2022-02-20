import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatList from '../screens/chats/ChatList';

type ChatParamList = {
  ChatList: undefined;
};

const Stack = createNativeStackNavigator<ChatParamList>();

export type ChatNavigationProp = NativeStackNavigationProp<ChatParamList>;

const ChatNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}} initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
