import React, {FC, useEffect, useState} from 'react';
import AvatarGroup from '../../../../components/surfaces/AvatarGroup';
import {User} from '../../../../models/User';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';
import {Group} from '../../../../models/Group';

type GroupListCardAvatarsProps = {
  group: Group;
};

const GroupListCardAvatars: FC<GroupListCardAvatarsProps> = ({group}) => {
  const {users} = useUserListContext();

  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  useEffect(() => {
    if (group && users) {
      const groupUserIds = group.members.map((user) => user.id);
      const updatedList = users.filter((user) => groupUserIds.includes(user.id));
      setUsersToShow(updatedList);
    }
  }, [users, group]);

  return <AvatarGroup users={usersToShow} />;
};

export default GroupListCardAvatars;
