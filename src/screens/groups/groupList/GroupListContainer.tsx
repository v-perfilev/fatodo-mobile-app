import React, {FC} from 'react';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import {ScrollView} from 'native-base';
import GroupListItem from './GroupListItem';

const GroupListContainer: FC = () => {
  const {groups} = useGroupListContext();

  return (
    <ScrollView>
      {groups.map((group) => (
        <GroupListItem group={group} key={group.id} />
      ))}
    </ScrollView>
  );
};

export default GroupListContainer;
