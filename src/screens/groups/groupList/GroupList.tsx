import React, {useEffect, useState} from 'react';
import GroupListContainer from './GroupListContainer';
import GroupListHeader from './GroupListHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {GroupsThunks} from '../../../store/groups/groupsActions';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const groupsLoading = useAppSelector(GroupsSelectors.loading);
  const [loading, setLoading] = useDelayedState();
  const [sorting, setSorting] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dispatch(GroupsThunks.fetchGroups())
      .unwrap()
      .finally(() => setLoading(false));
  }, []);

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
