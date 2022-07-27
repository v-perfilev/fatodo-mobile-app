import React, {useMemo} from 'react';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import {Item} from '../../../models/Item';
import {useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';

type GroupListItemProps = RenderItemParams<Group> & {
  sorting: boolean;
};

const GroupListItem = ({item: group, ...props}: GroupListItemProps) => {
  const listItems = useAppSelector(GroupsSelectors.items);
  const listCounts = useAppSelector(GroupsSelectors.itemsCount);
  const listCollapsed = useAppSelector(GroupsSelectors.itemsCollapsed);
  const listLoading = useAppSelector(GroupsSelectors.itemsLoading);

  const items = useMemo<Item[]>(() => listItems.get(group.id) || [], [listItems.get(group.id)]);
  const count = useMemo<number>(() => listCounts.get(group.id) || 0, [listCounts.get(group.id)]);
  const collapsed = useMemo<boolean>(() => listCollapsed.get(group.id) || false, [listCollapsed.get(group.id)]);
  const loading = useMemo<boolean>(() => listLoading.get(group.id) || false, [listLoading.get(group.id)]);

  return <GroupListCard group={group} items={items} count={count} loading={loading} collapsed={collapsed} {...props} />;
};

export default GroupListItem;
