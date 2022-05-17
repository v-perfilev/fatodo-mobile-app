import React, {useEffect, useState} from 'react';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {User} from '../../../models/User';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import UserView from '../../../components/views/UserView';
import FContainer from '../../../components/surfaces/FContainer';
import GroupViewUserSkeleton from './groupViewSkeletons/GroupViewUserSkeleton';

const GroupViewMenu = () => {
  const {group} = useGroupViewContext();
  const {users} = useUserListContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const [loading, setLoading] = useLoadingState();

  const updateUsersToShow = (): void => {
    const groupUserIds = group.members.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  useEffect(() => {
    if (group && users) {
      updateUsersToShow();
    }
  }, [users]);

  useEffect(() => {
    if (usersToShow.length > 0) {
      setLoading(false);
    }
  }, [usersToShow]);

  const skeletonsArray = Array.from({length: 3}, (_, i) => i);

  return (
    <>
      {loading && (
        <FContainer itemM="1.5">
          {skeletonsArray.map((skeleton) => (
            <GroupViewUserSkeleton key={skeleton} />
          ))}
        </FContainer>
      )}
      {!loading && (
        <FContainer itemM="1.5">
          {usersToShow.map((user) => (
            <UserView user={user} withUsername withPaperBox key={user.id} />
          ))}
        </FContainer>
      )}
    </>
  );
};

export default GroupViewMenu;
