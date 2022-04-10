import React, {FC, useEffect, useMemo} from 'react';
import {Group} from '../../../models/Group';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {flowRight} from 'lodash';
import withGroupView from '../../../shared/hocs/withViews/withGroupView';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {Item} from '../../../models/Item';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {useGroupListItemsContext} from '../../../shared/contexts/listContexts/groupListItemsContext';
import GroupListCard from './groupListCard/GroupListCard';

type GroupListItemProps = RenderItemParams<Group> & {
  sorting: boolean;
};

const GroupListItem: FC<GroupListItemProps> = ({item, sorting, drag}) => {
  const {handleUserIds} = useUserListContext();
  const {group, setGroup} = useGroupViewContext();
  const {
    items: listItems,
    counts: listCounts,
    collapsed: listCollapsed,
    loading: listLoading,
  } = useGroupListItemsContext();

  const items = useMemo<Item[]>(() => listItems.get(item.id) || [], [listItems.get(item?.id)]);
  const count = useMemo<number>(() => listCounts.get(item?.id) || 0, [listCounts.get(item?.id)]);
  const loading = useMemo<boolean>(() => listLoading.get(item.id) || false, [listLoading.get(item?.id)]);
  const collapsed = useMemo<boolean>(() => listCollapsed.get(item?.id) || false, [listCollapsed.get(item?.id)]);

  const loadGroupUsers = (): void => {
    const userIds = item.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const loadItemsUsers = (): void => {
    const userIds = items.reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    handleUserIds(userIds);
  };

  useEffect(() => {
    if (item) {
      loadGroupUsers();
    }
  }, [item]);

  useEffect(() => {
    if (items) {
      loadItemsUsers();
    }
  }, [items]);

  useEffect(() => {
    setGroup(item);
  }, [item]);

  return group ? (
    <GroupListCard items={items} count={count} loading={loading} collapsed={collapsed} sorting={sorting} drag={drag} />
  ) : null;
};

export default flowRight([withGroupView])(GroupListItem);
