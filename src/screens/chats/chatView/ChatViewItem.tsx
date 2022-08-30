import React, {memo} from 'react';
import {ChatItem} from '../../../models/Message';
import ChatViewMessage from './chatViewMessage/ChatViewMessage';
import ChatViewDate from './ChatViewDate';

type ChatViewItemProps = {
  item: ChatItem;
};

const ChatViewItem = ({item}: ChatViewItemProps) => {
  return (
    <>
      {item.date && <ChatViewDate date={item.date} />}
      {item.message && <ChatViewMessage message={item.message} />}
    </>
  );
};

export default memo(ChatViewItem);
