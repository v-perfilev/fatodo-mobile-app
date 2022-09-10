import React from 'react';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import {useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';

type GroupListItemProps = RenderItemParams<Group> & {
  sorting: boolean;
};

const GroupListItem = ({item: group, ...props}: GroupListItemProps) => {
  const items = useAppSelector((state) => GroupsSelectors.items(state, group.id));
  const count = useAppSelector((state) => GroupsSelectors.itemsCount(state, group.id));
  const collapsed = useAppSelector((state) => GroupsSelectors.itemsCollapsed(state, group.id));
  const loading = useAppSelector((state) => GroupsSelectors.itemsLoading(state, group.id));

  return <GroupListCard group={group} items={items} count={count} loading={loading} collapsed={collapsed} {...props} />;
};

export default GroupListItem;
