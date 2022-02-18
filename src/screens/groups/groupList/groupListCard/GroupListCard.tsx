import React, {FC, memo, useEffect, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {useGroupListItemsContext} from '../../../../shared/contexts/listContexts/groupListItemsContext';
import {Item} from '../../../../models/Item';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';
import {ThemeFactory} from '../../../../shared/themes/ThemeFactory';
import withAuthState from '../../../../shared/hocs/withAuthState';
import {flowRight} from 'lodash';
import {Box, NativeBaseProvider} from 'native-base';
import {ReduxAuthState} from '../../../../store/rerducers/AuthReducer';
import GroupListCardHeader from './GroupListCardHeader';
import GroupListCardContent from './GroupListCardContent';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {Group} from '../../../../models/Group';
import Collapsible from 'react-native-collapsible';

type GroupListCardProps = ReduxAuthState &
  RenderItemParams<Group> & {
    sorting: boolean;
  };

const GroupListCard: FC<GroupListCardProps> = ({account, sorting, drag}) => {
  const {group} = useGroupViewContext();
  const {handleUserIds} = useUserListContext();
  const {items: listItems, counts: listCounts, collapsed: listCollapsed} = useGroupListItemsContext();

  const items = useMemo<Item[]>(() => {
    return group && listItems.has(group.id) ? listItems.get(group.id) : [];
  }, [group, listItems]);

  const count = useMemo<number>(() => {
    return group && listCounts.has(group.id) ? listCounts.get(group.id) : 0;
  }, [group, listCounts]);

  const collapsed = useMemo<boolean>(() => {
    return group && listCollapsed.has(group.id) ? listCollapsed.get(group.id) : false;
  }, [group, listCollapsed]);

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

  const theme = ThemeFactory.getTheme(group?.color);

  return (
    <NativeBaseProvider theme={theme}>
      <Box borderRadius="3" shadow="9" pt="0" pb="1" px="1">
        <Box borderRadius="3" overflow={'hidden'}>
          <GroupListCardHeader account={account} sorting={sorting} drag={drag} />
          <Collapsible collapsed={collapsed}>
            <GroupListCardContent items={items} count={count} />
          </Collapsible>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
};

export default flowRight([withAuthState, memo])(GroupListCard);
