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

  const loadMore = (): Promise<any> => {
    return dispatch(GroupThunks.fetchActiveItems({groupId: group.id, offset: activeItems.length}));
  };

  const refresh = (): Promise<any> => {
    return dispatch(GroupThunks.refreshActiveItems(group.id));
  };

  const header = <GroupViewCreateButton />;

  return <GroupViewItems items={activeItems} loadMorePromise={loadMore} refreshPromise={refresh} header={header} />;
};

export default GroupViewActiveItems;
