import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useWsContext} from '../../contexts/WsContext';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {ChatActions} from '../../../store/chat/chatActions';

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
  const chatId = chat?.id;

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic === WsChatDestinations.CHAT_NEW) {
      dispatch(ChatsActions.addChatWs(msg));
    } else if (topic.startsWith(WsChatDestinations.CHAT_UPDATE)) {
      dispatch(ChatsActions.updateChatWs(msg));
    } else if (topic.startsWith(WsChatDestinations.CHAT_LAST_MESSAGE)) {
      dispatch(ChatsActions.addChatWs(msg));
    } else if (topic.startsWith(WsChatDestinations.CHAT_LAST_MESSAGE_UPDATE)) {
      dispatch(ChatsActions.updateChatWs(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_NEW)) {
      dispatch(ChatActions.addMessageWs(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_UPDATE)) {
      dispatch(ChatActions.updateMessageWs(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_STATUS)) {
      dispatch(ChatActions.updateMessageReactionsWs(msg));
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_REACTION)) {
      dispatch(ChatActions.updateMessageStatusesWs(msg));
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
