import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ChatViewContainer from './ChatViewContainer';
import {RootParamList} from '../../../navigators/RootNavigator';
import ChatSelectors from '../../../store/chat/chatSelectors';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import {UsersThunks} from '../../../store/users/usersActions';
import {ChatActions, ChatThunks} from '../../../store/chat/chatActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';

const ChatView = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootParamList, 'ChatView'>>();
  const [loading, setLoading] = useDelayedState();
  const routeChat = route.params.chat;
  const routeChatId = route.params.chatId;
  const chat = useAppSelector(ChatSelectors.chat);

  const goBack = (): void => navigation.goBack();

  const selectChat = (): void => {
    dispatch(ChatActions.selectChat(routeChat)).then(() => setLoading(false));
  };

  const loadChat = (): void => {
    dispatch(ChatThunks.fetchChat(routeChatId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeChat && routeChat.id !== chat?.id) {
      selectChat();
    } else if (routeChatId && routeChatId !== chat?.id) {
      loadChat();
    } else if (!routeChat && !routeChatId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (chat) {
      const userIds = chat.members;
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [chat]);

  return (
    <>
      <ChatViewHeader />
      <ConditionalSpinner loading={loading}>
        <ChatViewContainer />
        <ChatViewControl />
      </ConditionalSpinner>
    </>
  );
};

export default ChatView;
