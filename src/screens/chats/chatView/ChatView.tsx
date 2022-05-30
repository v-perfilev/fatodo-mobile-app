import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import AuthSelectors from '../../../store/auth/authSelectors';
import UsersSelectors from '../../../store/users/usersSelectors';
import ChatViewContainer from './ChatViewContainer';
import {RootParamList} from '../../../navigators/RootNavigator';
import ChatSelectors from '../../../store/chat/chatSelectors';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import {UsersThunks} from '../../../store/users/usersActions';
import {ChatActions} from '../../../store/chat/chatActions';

const ChatView = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(UsersSelectors.users);
  const account = useAppSelector(AuthSelectors.account);
  const chatFromState = useAppSelector(ChatSelectors.chat);
  const route = useRoute<RouteProp<RootParamList, 'ChatView'>>();
  const chat = route.params.chat;

  const title = useMemo<string>(() => {
    return ChatUtils.getTitle(chat, users, account);
  }, [chat, users, account]);

  useEffect(() => {
    if (chat.id !== chatFromState?.id) {
      const userIds = chat.members;
      dispatch(ChatActions.selectChat(chat));
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, []);

  return (
    <>
      <ChatViewHeader title={title} chat={chat} />
      <ChatViewContainer />
      <ChatViewControl chat={chat} />
    </>
  );
};

export default ChatView;
