import React, {useEffect, useState} from 'react';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import {User} from '../../../models/User';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import {Box, Flex} from 'native-base';
import UserView from '../../../components/views/UserView';
import GroupViewUsersSkeleton from './groupViewSkeletons/GroupViewUsersSkeleton';

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

  return (
    <Flex mb="-1.5" flexDirection="row" flexWrap="wrap">
      {loading && <GroupViewUsersSkeleton />}
      {!loading &&
        usersToShow.map((user) => (
          <Box mr="1.5" mb="1.5" key={user.id}>
            <UserView user={user} withUsername withPaperBox />
          </Box>
        ))}
    </Flex>
  );
};

export default GroupViewMenu;
