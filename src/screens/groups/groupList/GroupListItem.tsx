import React, {useMemo} from 'react';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {Theme} from 'native-base/src/theme';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import {Item} from '../../../models/Item';
import {useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {IBoxProps} from 'native-base';

type GroupListItemProps = IBoxProps &
  RenderItemParams<Group> & {
    sorting: boolean;
  };

const GroupListItem = ({item: group, sorting, drag, ...props}: GroupListItemProps) => {
  const listItems = useAppSelector(GroupsSelectors.items);
  const listCounts = useAppSelector(GroupsSelectors.itemsCount);
  const listCollapsed = useAppSelector(GroupsSelectors.itemsCollapsed);
  const listLoading = useAppSelector(GroupsSelectors.itemsLoading);

  const theme = useMemo<Theme>(() => ThemeFactory.getTheme(group.color), [group]);
  const items = useMemo<Item[]>(() => listItems.get(group.id) || [], [listItems.get(group.id)]);
  const count = useMemo<number>(() => listCounts.get(group.id) || 0, [listCounts.get(group.id)]);
  const collapsed = useMemo<boolean>(() => listCollapsed.get(group.id) || false, [listCollapsed.get(group.id)]);
  const loading = useMemo<boolean>(() => listLoading.get(group.id) || false, [listLoading.get(group.id)]);

  return (
    <GroupListCard
      group={group}
      items={items}
      count={count}
      loading={loading}
      collapsed={collapsed}
      sorting={sorting}
      drag={drag}
      theme={theme}
      {...props}
    />
  );
};

export default GroupListItem;
