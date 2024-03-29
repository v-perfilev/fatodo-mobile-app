import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {ProtectedNavigationProps, ProtectedParamList} from '../../../navigators/ProtectedNavigator';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {Chat} from '../../../models/Chat';

export type WithChatProps = {
  chat?: Chat;
  containerLoading: boolean;
};

const withChatContainer = (Component: ComponentType<WithChatProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<ProtectedNavigationProps>();
  const [containerLoading, setContainerLoading] = useDelayedState(true, 500);
  const route = useRoute<RouteProp<ProtectedParamList, 'withChat'>>();
  const routeChat = route.params.chat;
  const routeChatId = route.params.chatId;
  const chat = useAppSelector(ChatSelectors.chat);
  const shouldLoad = useAppSelector(ChatSelectors.shouldLoad);

  const goBack = (): void => {
    navigation.goBack();
  };

  const selectChat = (): void => {
    dispatch(ChatActions.selectChatThunk(routeChat))
      .unwrap()
      .then(() => setContainerLoading(false));
  };

  const loadChat = (): void => {
    dispatch(ChatActions.fetchChatThunk(routeChatId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setContainerLoading(false));
  };

  const reloadChat = (): void => {
    dispatch(ChatActions.fetchChatAfterRestartThunk(chat.id))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (routeChat && routeChat.id !== chat?.id) {
      selectChat();
    } else if (routeChatId && routeChatId !== chat?.id) {
      loadChat();
    } else if (!routeChat && !routeChatId) {
      goBack();
    } else {
      setContainerLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused && chat && shouldLoad) {
      reloadChat();
    }
  }, [isFocused, shouldLoad]);

  useEffect(() => {
    if (!chat && !containerLoading) {
      goBack();
    }
  }, [chat]);

  return <Component containerLoading={containerLoading} chat={chat || routeChat} {...props} />;
};

export default withChatContainer;
