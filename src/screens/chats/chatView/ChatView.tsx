import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import Header from '../../../components/layouts/Header';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import AuthSelectors from '../../../store/auth/authSelectors';
import UsersSelectors from '../../../store/users/usersSelectors';
import UsersThunks from '../../../store/users/usersThunks';
import ChatActions from '../../../store/chat/chatActions';
import ChatViewContainer from './ChatViewContainer';
import {RootParamList} from '../../../navigators/RootNavigator';
import ChatSelectors from '../../../store/chat/chatSelectors';

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
      <Header title={title} />
      <ChatViewContainer />
    </>
  );
};

export default ChatView;
