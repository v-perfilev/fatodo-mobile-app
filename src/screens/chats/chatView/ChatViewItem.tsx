import React, {useMemo} from 'react';
import {ChatItem, Message} from '../../../models/Message';
import ChatViewMessage from './chatViewMessage/ChatViewMessage';
import ChatViewDate from './ChatViewDate';

type ChatViewItemProps = {
  item: ChatItem;
};

const ChatViewItem = ({item}: ChatViewItemProps) => {
  const message = useMemo<Message>(() => item.message, [item]);
  const date = useMemo<string>(() => item.date, [item]);

  return (
    <>
      {date && <ChatViewDate date={date} />}
      {message && <ChatViewMessage message={message} />}
    </>
  );
};

export default ChatViewItem;
