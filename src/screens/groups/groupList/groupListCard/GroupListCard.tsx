import React, {FC, memo, useEffect, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {useGroupListItemsContext} from '../../../../shared/contexts/listContexts/groupListItemsContext';
import {ThemeFactory} from '../../../../shared/themes/ThemeFactory';
import withAuthState from '../../../../shared/hocs/withAuthState';
import {flowRight} from 'lodash';
import {Box} from 'native-base';
import {ReduxAuthState} from '../../../../store/rerducers/AuthReducer';
import GroupListCardHeader from './GroupListCardHeader';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {Group} from '../../../../models/Group';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import GroupListCardContent from './GroupListCardContent';
import {Item} from '../../../../models/Item';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';

type GroupListCardProps = ReduxAuthState &
  RenderItemParams<Group> & {
    sorting: boolean;
  };

const GroupListCard: FC<GroupListCardProps> = ({account, sorting, drag}) => {
  const {handleUserIds} = useUserListContext();
  const {group} = useGroupViewContext();
  const {
    items: listItems,
    counts: listCounts,
    collapsed: listCollapsed,
    loading: listLoading,
  } = useGroupListItemsContext();

  const items = useMemo<Item[]>(() => listItems.get(group.id) || [], [listItems.get(group?.id)]);
  const count = useMemo<number>(() => listCounts.get(group?.id) || 0, [listCounts.get(group?.id)]);
  const loading = useMemo<boolean>(() => listLoading.get(group.id) || false, [listLoading.get(group?.id)]);
  const collapsed = useMemo<boolean>(() => listCollapsed.get(group?.id) || false, [listCollapsed.get(group?.id)]);

  const loadGroupUsers = (): void => {
    const userIds = group.members.map((user) => user.id);
    handleUserIds(userIds);
  };

  const loadItemsUsers = (): void => {
    const userIds = items.reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    handleUserIds(userIds);
  };

  useEffect(() => {
    if (group) {
      loadGroupUsers();
    }
  }, [group]);

  useEffect(() => {
    if (items) {
      loadItemsUsers();
    }
  }, [items]);

  const theme = useMemo(() => ThemeFactory.getTheme(group?.color), [group]);

  return (
    <ThemeProvider theme={theme}>
      <Box borderRadius="4" shadow="6" mb="1" mx="1" overflow="hidden">
        <GroupListCardHeader account={account} sorting={sorting} drag={drag} />
        <Collapsible collapsed={collapsed} duration={300}>
          <GroupListCardContent items={items} count={count} loading={loading} />
        </Collapsible>
      </Box>
    </ThemeProvider>
  );
};

export default flowRight([withAuthState, memo])(GroupListCard);
