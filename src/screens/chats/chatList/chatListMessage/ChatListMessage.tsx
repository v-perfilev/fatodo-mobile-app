import {User} from '../../../../models/User';
import {useAppDispatch} from '../../../../store/store';
import React, {useEffect} from 'react';
import UsersThunks from '../../../../store/users/usersThunks';
import {Message} from '../../../../models/Message';
import ChatListMessageOutcoming from './ChatListMessageOutcoming';
import ChatListMessageIncoming from './ChatListMessageIncoming';
import ChatListMessageEvent from './ChatListMessageEvent';

type ChatListMessageProps = {
  message: Message;
  account: User;
};

const ChatListMessage = ({message, account}: ChatListMessageProps) => {
  const dispatch = useAppDispatch();

  const isMessageOutcoming = message && !message.isEvent && message.userId === account.id;
  const isMessageIncoming = message && !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message && message && message.isEvent;

  useEffect(() => {
    if (message) {
      const userIds = [message.userId];
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, []);

  return (
    <>
      {isMessageOutcoming && <ChatListMessageOutcoming message={message} />}
      {isMessageIncoming && <ChatListMessageIncoming message={message} />}
      {isMessageEvent && <ChatListMessageEvent message={message} />}
    </>
  );
};

export default ChatListMessage;
