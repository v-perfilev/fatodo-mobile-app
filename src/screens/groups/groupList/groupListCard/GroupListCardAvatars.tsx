import React, {useEffect, useState} from 'react';
import AvatarGroup from '../../../../components/surfaces/AvatarGroup';
import {User} from '../../../../models/User';
import {Group} from '../../../../models/Group';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {MapUtils} from '../../../../shared/utils/MapUtils';

type GroupListCardAvatarsProps = {
  group: Group;
};

const GroupListCardAvatars = ({group}: GroupListCardAvatarsProps) => {
  const users = useAppSelector(InfoSelectors.users);

  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  useEffect(() => {
    if (group && users) {
      const groupUserIds = group.members.map((user) => user.id);
      const updatedList = MapUtils.get(users, groupUserIds);
      setUsersToShow(updatedList);
    }
  }, [users, group]);

  return <AvatarGroup users={usersToShow} />;
};

export default GroupListCardAvatars;
