import {useAppDispatch, useAppSelector} from '../../../store/store';
import React, {useCallback, useEffect, useMemo} from 'react';
import {ChatItem} from '../../../models/ChatItem';
import {MessageUtils} from '../../../shared/utils/MessageUtils';
import AuthSelectors from '../../../store/auth/authSelectors';
import {Message} from '../../../models/Message';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import ChatViewMessage from './chatViewMessage/ChatViewMessage';
import ChatViewDate from './ChatViewDate';
import {Box} from 'native-base';
import ChatThunks from '../../../store/chat/chatThunks';

type ChatViewItemProps = {
  item: ChatItem;
  isVisible: boolean;
};

const ChatViewItem = ({item, isVisible}: ChatViewItemProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  let timerId: any;

  const message = useMemo<Message>(() => item.message, [item]);

  const date = useMemo<string>(() => item.date, [item]);

  const isIncomingMessage = useMemo<boolean>((): boolean => {
    return MessageUtils.isIncomingMessage(message, account);
  }, [message]);

  const isRead = useMemo<boolean>((): boolean => {
    return MessageUtils.isReadMessage(message, account);
  }, [message]);

  const markAsRead = useCallback((): void => {
    dispatch(ChatThunks.markAsRead(message.id));
  }, [message]);

  const markAsReadIfNeeded = (): void => {
    if (isVisible) {
      timerId = setTimeout(() => markAsRead(), TIMEOUT_BEFORE_MARK_AS_READ);
    } else {
      clearTimeout(timerId);
    }
  };

  useEffect(() => {
    if (isIncomingMessage && !isRead) {
      markAsReadIfNeeded();
    }
  }, [isVisible]);

  return (
    <Box my="1.5">
      {date && <ChatViewDate date={date} />}
      {message && <ChatViewMessage message={message} />}
    </Box>
  );
};

export default ChatViewItem;
