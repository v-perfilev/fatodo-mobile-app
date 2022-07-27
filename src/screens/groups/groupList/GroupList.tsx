import React, {useEffect, useState} from 'react';
import GroupListContainer from './GroupListContainer';
import GroupListHeader from './GroupListHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {GroupsThunks} from '../../../store/groups/groupsActions';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const groupsLoading = useAppSelector(GroupsSelectors.loading);
  const [sorting, setSorting] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GroupsThunks.fetchGroups());
  }, []);

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
