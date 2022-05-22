import React, {useEffect, useState} from 'react';
import GroupListContainer from './GroupListContainer';
import GroupListHeader from './GroupListHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UsersThunks from '../../../store/users/usersThunks';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupsThunks from '../../../store/groups/groupsThunks';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const groupsLoading = useAppSelector(GroupsSelectors.loading);
  const items = useAppSelector(GroupsSelectors.items);
  const [sorting, setSorting] = useState<boolean>(false);

  const loadGroups = (): void => {
    dispatch(GroupsThunks.fetchGroups());
  };

  const loadInitialState = (groupIds: string[]): void => {
    dispatch(GroupsThunks.fetchItems(groupIds));
  };

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
    dispatch(UsersThunks.handleUserIds(userIds));
  }, [groups]);

  useEffect(() => {
    const userIds = Array.from(items.values())
      .reduce((acc, i) => [...acc, ...i], [])
      .reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    dispatch(UsersThunks.handleUserIds(userIds));
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

export default GroupList;
