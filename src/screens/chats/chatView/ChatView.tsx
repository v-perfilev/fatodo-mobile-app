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

const ChatView = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(UsersSelectors.users);
  const account = useAppSelector(AuthSelectors.account);
  const route = useRoute<RouteProp<RootParamList, 'ChatView'>>();
  const chat = route.params.chat;

  const title = useMemo<string>(() => {
    return ChatUtils.getTitle(chat, users, account);
  }, [chat, users, account]);

  useEffect(() => {
    const userIds = chat.members;
    dispatch(UsersThunks.handleUserIds(userIds));
    dispatch(ChatActions.selectChat(chat));
  }, [chat]);

  return (
    <>
      <Header title={title} />
      <ChatViewContainer />
    </>
  );
};

export default ChatView;
