import React, {useEffect, useState} from 'react';
import GroupListContainer from './GroupListContainer';
import GroupListHeader from './GroupListHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch} from '../../../store/store';
import {GroupsThunks} from '../../../store/groups/groupsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = useState<boolean>(false);
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    dispatch(GroupsThunks.fetchGroups()).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <GroupListHeader sorting={sorting} setSorting={setSorting} />
      <ConditionalSpinner loading={loading}>
        <GroupListContainer sorting={sorting} />
      </ConditionalSpinner>
    </>
  );
};

export default GroupList;
