import React, {useEffect, useState} from 'react';
import ChatListControl from './ChatListControl';
import ChatListRegular from './ChatListRegular';
import ChatListFiltered from './ChatListFiltered';
import ChatListHeader from './ChatListHeader';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const showFiltered = filter?.trim().length > 0;
    setType(showFiltered ? 'filtered' : 'regular');
  }, [filter]);

  return (
    <>
      <ChatListHeader />
      <ChatListControl setFilter={setFilter} />
      {type === 'regular' && <ChatListRegular />}
      {type === 'filtered' && <ChatListFiltered filter={filter} />}
    </>
  );
};

export default ChatList;
