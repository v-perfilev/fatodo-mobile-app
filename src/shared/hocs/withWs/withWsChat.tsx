import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useWsContext} from '../../contexts/WsContext';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {ChatActions} from '../../../store/chat/chatActions';
import AuthSelectors from '../../../store/auth/authSelectors';

enum WsChatDestinations {
  CHAT_NEW = '/user/chat/new',
  CHAT_UPDATE = '/user/chat/update',
  CHAT_LAST_MESSAGE = '/user/chat/last-message',
  CHAT_LAST_MESSAGE_UPDATE = '/user/chat/last-message-update',
  MESSAGE_NEW = '/user/message/new/',
  MESSAGE_UPDATE = '/user/message/update/',
  MESSAGE_STATUS = '/user/message/status/',
  MESSAGE_REACTION = '/user/message/reaction/',
}

const withWsChat = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();
  const chat = useAppSelector(ChatSelectors.chat);
  const account = useAppSelector(AuthSelectors.account);
  const chatId = chat?.id;

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic === WsChatDestinations.CHAT_NEW) {
      dispatch(ChatsActions.addChat(msg));
    } else if (topic.startsWith(WsChatDestinations.CHAT_UPDATE)) {
      dispatch(ChatsActions.updateChat(msg));
    } else if (topic.startsWith(WsChatDestinations.CHAT_LAST_MESSAGE)) {
      dispatch(ChatsActions.addChatLastMessage(msg, account));
    } else if (topic.startsWith(WsChatDestinations.CHAT_LAST_MESSAGE_UPDATE)) {
      dispatch(ChatsActions.updateChat(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_NEW)) {
      dispatch(ChatActions.addMessage(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_UPDATE)) {
      dispatch(ChatActions.updateMessage(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_STATUS)) {
      dispatch(ChatActions.updateMessageStatuses(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_REACTION)) {
      dispatch(ChatActions.updateMessageReactions(msg));
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    const wsTopics = [
      WsChatDestinations.CHAT_NEW,
      WsChatDestinations.CHAT_UPDATE,
      WsChatDestinations.CHAT_LAST_MESSAGE,
      WsChatDestinations.CHAT_LAST_MESSAGE_UPDATE,
    ] as string[];
    if (chatId) {
      wsTopics.push(
        WsChatDestinations.MESSAGE_NEW + chatId,
        WsChatDestinations.MESSAGE_UPDATE + chatId,
        WsChatDestinations.MESSAGE_STATUS + chatId,
        WsChatDestinations.MESSAGE_REACTION + chatId,
      );
    }
    return wsTopics;
  }, [chatId]);

  useEffect(() => {
    setTopicsAndHandler('WS_CHAT', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_CHAT');
  }, [chatId]);

  return <Component {...props} />;
};

export default withWsChat;
