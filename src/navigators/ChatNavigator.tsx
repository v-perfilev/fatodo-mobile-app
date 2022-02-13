import React, {FC} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChatList from '../screens/chats/ChatList';

type ChatStackParamList = {
  ChatList: undefined;
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

export type ChatStackNavigationProp = NativeStackNavigationProp<ChatStackParamList>;

const ChatNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
