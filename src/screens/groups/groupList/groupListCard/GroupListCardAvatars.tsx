import React, {useEffect, useState} from 'react';
import AvatarGroup from '../../../../components/surfaces/AvatarGroup';
import {User} from '../../../../models/User';
import {Group} from '../../../../models/Group';
import {useAppSelector} from '../../../../store/store';
import UsersSelectors from '../../../../store/users/usersSelectors';

type GroupListCardAvatarsProps = {
  group: Group;
};

const GroupListCardAvatars = ({group}: GroupListCardAvatarsProps) => {
  const users = useAppSelector(UsersSelectors.usersSelector);

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
