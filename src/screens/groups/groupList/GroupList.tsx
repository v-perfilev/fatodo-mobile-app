import React, {useEffect, useState} from 'react';
import GroupListContainer from './GroupListContainer';
import GroupListHeader from './GroupListHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {GroupsThunks} from '../../../store/groups/groupsActions';
import {UsersThunks} from '../../../store/users/usersActions';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const groupsLoading = useAppSelector(GroupsSelectors.loading);
  const items = useAppSelector(GroupsSelectors.items);
  const [loading, setLoading] = useDelayedState();
  const [sorting, setSorting] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dispatch(GroupsThunks.fetchGroups())
      .unwrap()
      .finally(() => setLoading(false));
  }, []);

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
      <ConditionalSpinner loading={loading || groupsLoading}>
        <GroupListContainer sorting={sorting} />
      </ConditionalSpinner>
    </>
  );
};

export default GroupList;
