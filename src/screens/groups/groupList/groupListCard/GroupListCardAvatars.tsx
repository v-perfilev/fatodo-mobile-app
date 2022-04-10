import React, {FC, useEffect, useState} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import AvatarGroup from '../../../../components/surfaces/AvatarGroup';
import {User} from '../../../../models/User';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';

const GroupListCardAvatars: FC = () => {
  const {users} = useUserListContext();
  const {group} = useGroupViewContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const updateUsersToShow = (): void => {
    const groupUserIds = group.members.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  useEffect(() => {
    updateUsersToShow();
  }, [users, group]);

  return <AvatarGroup users={usersToShow} />;
};

export default GroupListCardAvatars;
