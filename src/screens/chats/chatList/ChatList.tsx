import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import FScrollView from '../../../components/surfaces/FScrollView';
import FVStack from '../../../components/surfaces/FVStack';
import ChatListHeader from './ChatListHeader';
import ChatListRegular from './ChatListRegular';
import ChatListFiltered from './ChatListFiltered';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const showFiltered = filter.trim().length > 0;
    setType(showFiltered ? 'filtered' : 'regular');
  }, [filter]);

  return (
    <FScrollView>
      <FVStack grow defaultSpace>
        <ChatListHeader setFilter={setFilter} />
        {type === 'filtered' && <ChatListRegular />}
        {type === 'filtered' && <ChatListFiltered filter={filter} />}
      </FVStack>
    </FScrollView>
  );
};

export default flowRight([withHeader])(ChatList);
