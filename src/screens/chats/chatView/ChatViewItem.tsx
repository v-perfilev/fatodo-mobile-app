import React, {useMemo} from 'react';
import {ChatItem} from '../../../models/ChatItem';
import {Message} from '../../../models/Message';
import ChatViewMessage from './chatViewMessage/ChatViewMessage';
import ChatViewDate from './ChatViewDate';
import {Box} from 'native-base';

type ChatViewItemProps = {
  item: ChatItem;
};

const ChatViewItem = ({item}: ChatViewItemProps) => {
  const message = useMemo<Message>(() => item.message, [item]);
  const date = useMemo<string>(() => item.date, [item]);

  return (
    <Box my="1.5">
      {date && <ChatViewDate date={date} />}
      {message && <ChatViewMessage message={message} />}
    </Box>
  );
};

export default ChatViewItem;
