import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import withGroupListItems from '../../../shared/hocs/withLists/withGroupListItems';
import withGroupList from '../../../shared/hocs/withLists/withGroupList';
import {useGroupListContext} from '../../../shared/contexts/listContexts/groupListContext';
import GroupListContainer from './GroupListContainer';
import {useGroupListItemsContext} from '../../../shared/contexts/listContexts/groupListItemsContext';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import GroupListHeader from './GroupListHeader';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';

const GroupList = () => {
  const {handleUserIds} = useUserListContext();
  const {groups, load: loadGroups, loading: groupsLoading} = useGroupListContext();
  const {items, loadInitialState} = useGroupListItemsContext();
  const [sorting, setSorting] = useState<boolean>(false);

  useEffect(() => {
    loadGroups();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      const groupIds = groups.map((g) => g.id);
      loadInitialState(groupIds);
    }
  }, [groups.length]);

  useEffect(() => {
    const userIds = groups.reduce((acc, group) => [...acc, group.members], []).map((user) => user.id);
    handleUserIds(userIds);
  }, [groups]);

  useEffect(() => {
    const userIds = Array.from(items.values())
      .reduce((acc, i) => [...acc, ...i], [])
      .reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    handleUserIds(userIds);
  }, [items]);

  return (
    <>
      <GroupListHeader sorting={sorting} setSorting={setSorting} />
      <ConditionalSpinner loading={groupsLoading}>
        <GroupListContainer sorting={sorting} />
      </ConditionalSpinner>
    </>
  );
};

export default flowRight([withGroupList, withGroupListItems, withUserList])(GroupList);
