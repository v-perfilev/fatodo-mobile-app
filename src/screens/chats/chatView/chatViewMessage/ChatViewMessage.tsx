import {Message} from '../../../../models/Message';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import React, {useEffect, useMemo} from 'react';
import UsersThunks from '../../../../store/users/usersThunks';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {ChatItemType} from '../../../../models/ChatItem';
import ChatViewMessageOutcoming from './ChatViewMessageOutcoming';
import ChatViewMessageIncoming from './ChatViewMessageIncoming';
import ChatViewMessageEvent from './ChatViewMessageEvent';

type ChatViewMessageProps = {
  message: Message;
};

const ChatViewMessage = ({message}: ChatViewMessageProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);

  const type = useMemo<ChatItemType>(() => {
    if (message && message.isEvent) {
      return 'event';
    } else if (message && MessageUtils.isIncomingMessage(message, account)) {
      return 'incoming';
    } else if (message) {
      return 'outcoming';
    } else {
      return null;
    }
  }, [message]);

  useEffect(() => {
    const reactionUserIds = message.reactions.map((r) => r.userId);
    const statusUserIds = message.statuses.map((s) => s.userId);
    const userIds = [message.userId, ...reactionUserIds, ...statusUserIds];
    dispatch(UsersThunks.handleUserIds(userIds));
  }, [message]);

  return (
    <>
      {type === 'outcoming' && <ChatViewMessageOutcoming message={message} />}
      {type === 'incoming' && <ChatViewMessageIncoming message={message} />}
      {type === 'event' && <ChatViewMessageEvent message={message} />}
    </>
  );
};

export default ChatViewMessage;
