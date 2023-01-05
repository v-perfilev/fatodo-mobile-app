import {ChatItemType, Message} from '../../../../models/Message';
import {useAppSelector} from '../../../../store/store';
import React, {memo, useMemo} from 'react';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import ChatViewMessageEvent from './ChatViewMessageEvent';
import FBox from '../../../../components/boxes/FBox';
import ChatViewMessageIncoming from './ChatViewMessageIncoming';
import ChatViewMessageOutcoming from './ChatViewMessageOutcoming';

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
    <FBox px="4" py="2">
      {type === 'outcoming' && <ChatViewMessageOutcoming message={message} />}
      {type === 'incoming' && <ChatViewMessageIncoming message={message} />}
      {type === 'event' && <ChatViewMessageEvent message={message} />}
    </FBox>
  );
};

export default memo(ChatViewMessage);
