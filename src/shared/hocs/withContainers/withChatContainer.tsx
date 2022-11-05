import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {RootNavigationProp, RootParamList} from '../../../navigators/RootNavigator';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {Chat} from '../../../models/Chat';

export type WithChatProps = {
  chat?: Chat;
  containerLoading: boolean;
};

const withChatContainer = (Component: ComponentType<WithChatProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProp>();
  const [containerLoading, setContainerLoading] = useDelayedState();
  const route = useRoute<RouteProp<RootParamList, 'withChat'>>();
  const routeChat = route.params.chat;
  const routeChatId = route.params.chatId;
  const chat = useAppSelector(ChatSelectors.chat);

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

  return <Component containerLoading={containerLoading} chat={chat || routeChat} {...props} />;
};

export default withChatContainer;
