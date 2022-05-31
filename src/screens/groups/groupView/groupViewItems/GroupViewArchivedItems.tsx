import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import {GroupThunks} from '../../../../store/group/groupActions';
import GroupViewItems from './GroupViewItems';

const GroupViewActiveItems = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const archivedItems = useAppSelector(GroupSelectors.archivedItems);

  const loadMorePromise = (): Promise<any> => {
    return dispatch(GroupThunks.fetchArchivedItems({groupId: group.id, offset: archivedItems.length}));
  };

  return <GroupViewItems items={archivedItems} loadMorePromise={loadMorePromise} />;
};

export default GroupViewActiveItems;
