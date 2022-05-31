import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import {GroupThunks} from '../../../../store/group/groupActions';
import GroupViewItems from './GroupViewItems';
import GroupViewCreateButton from './GroupViewCreateButton';

const GroupViewActiveItems = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const activeItems = useAppSelector(GroupSelectors.activeItems);

  const header = <GroupViewCreateButton />;

  const loadMorePromise = (): Promise<any> => {
    return dispatch(GroupThunks.fetchActiveItems({groupId: group.id, offset: activeItems.length}));
  };

  return <GroupViewItems items={activeItems} loadMorePromise={loadMorePromise} header={header} />;
};

export default GroupViewActiveItems;
