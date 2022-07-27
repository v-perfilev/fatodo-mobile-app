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
  const activeItemsLoading = useAppSelector(GroupSelectors.activeItemsLoading);

  const load = async (): Promise<void> => {
    await dispatch(GroupThunks.fetchActiveItems({groupId: group.id, offset: activeItems.length}));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(GroupThunks.refreshActiveItems(group.id));
  };

  const loading = activeItems.length === 0 && activeItemsLoading;
  const header = <GroupViewCreateButton />;

  return <GroupViewItems items={activeItems} load={load} refresh={refresh} loading={loading} header={header} />;
};

export default GroupViewActiveItems;
