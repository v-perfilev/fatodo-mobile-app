import React, {useEffect, useState} from 'react';
import ChatListHeader from './ChatListHeader';
import ChatListRegular from './ChatListRegular';
import ChatListFiltered from './ChatListFiltered';
import Header from '../../../components/layouts/Header';

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
      <Header hideGoBack />
      <ChatListHeader setFilter={setFilter} />
      {type === 'regular' && <ChatListRegular />}
      {type === 'filtered' && <ChatListFiltered filter={filter} />}
    </>
  );
};

export default ChatList;
