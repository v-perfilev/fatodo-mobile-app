import {ChatItemType, Message} from '../../../../models/Message';
import {useAppSelector} from '../../../../store/store';
import React, {useMemo} from 'react';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import ChatViewMessageOutcoming from './ChatViewMessageOutcoming';
import ChatViewMessageIncoming from './ChatViewMessageIncoming';
import ChatViewMessageEvent from './ChatViewMessageEvent';

type ChatViewMessageProps = {
  message: Message;
};

const ChatViewMessage = ({message}: ChatViewMessageProps) => {
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

  return (
    <>
      {type === 'outcoming' && <ChatViewMessageOutcoming message={message} />}
      {type === 'incoming' && <ChatViewMessageIncoming message={message} />}
      {type === 'event' && <ChatViewMessageEvent message={message} />}
    </>
  );
};

export default ChatViewMessage;
