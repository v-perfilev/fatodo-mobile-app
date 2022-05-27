import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import FVStack from '../../../components/surfaces/FVStack';
import ChatListHeader from './ChatListHeader';
import ChatListRegular from './ChatListRegular';
import ChatListFiltered from './ChatListFiltered';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const showFiltered = filter?.trim().length > 0;
    setType(showFiltered ? 'filtered' : 'regular');
  }, [filter]);

  return (
    <FVStack grow defaultSpace>
      <ChatListHeader setFilter={setFilter} />
      {type === 'regular' && <ChatListRegular />}
      {type === 'filtered' && <ChatListFiltered filter={filter} />}
    </FVStack>
  );
};

export default flowRight([withHeader])(ChatList);
