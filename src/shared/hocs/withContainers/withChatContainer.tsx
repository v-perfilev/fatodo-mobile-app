import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {useDelayedState} from '../../hooks/useDelayedState';
import {RootParamList} from '../../../navigators/RootNavigator';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatThunks} from '../../../store/chat/chatActions';
import {Chat} from '../../../models/Chat';

export type WithChatProps = {
  chat?: Chat;
  loading: boolean;
};

const withChatContainer = (Component: ComponentType<WithChatProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<RootParamList, 'withChat'>>();
  const routeChat = route.params.chat;
  const routeChatId = route.params.chatId;
  const chat = useAppSelector(ChatSelectors.chat);

  const goBack = (): void => navigation.goBack();

  const selectChat = (): void => {
    dispatch(ChatThunks.selectChat(routeChat))
      .unwrap()
      .then(() => setLoading(false));
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

  return <Component loading={loading} chat={chat || routeChat} {...props} />;
};

export default withChatContainer;
