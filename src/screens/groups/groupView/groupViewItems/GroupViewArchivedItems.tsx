import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import {GroupThunks} from '../../../../store/group/groupActions';
import GroupViewItems from './GroupViewItems';

const GroupViewActiveItems = () => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const archivedItems = useAppSelector(GroupSelectors.archivedItems);

  const loadMore = (): Promise<any> => {
    return dispatch(GroupThunks.fetchArchivedItems({groupId: group.id, offset: archivedItems.length}));
  };

  const refresh = (): Promise<any> => {
    return dispatch(GroupThunks.refreshArchivedItems(group.id));
  };

  return <GroupViewItems items={archivedItems} loadMorePromise={loadMore} refreshPromise={refresh} />;
};

export default GroupViewActiveItems;
