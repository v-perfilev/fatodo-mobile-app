import {User} from '../../../models/User';
import {useAppDispatch} from '../../../store/store';
import React, {useEffect} from 'react';
import UsersThunks from '../../../store/users/usersThunks';
import {Message} from '../../../models/Message';
import ChatListItemMessageOutcoming from './ChatListItemMessageOutcoming';
import ChatListItemMessageIncoming from './ChatListItemMessageIncoming';
import ChatListItemMessageEvent from './ChatListItemMessageEvent';

type ChatListItemMessageProps = {
  message: Message;
  account: User;
};

const ChatListItemMessage = ({message, account}: ChatListItemMessageProps) => {
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
      {isMessageOutcoming && <ChatListItemMessageOutcoming message={message} />}
      {isMessageIncoming && <ChatListItemMessageIncoming message={message} />}
      {isMessageEvent && <ChatListItemMessageEvent message={message} />}
    </>
  );
};

export default ChatListItemMessage;
