import React from 'react';
import {Text} from 'native-base';
import UserLink from '../../../../components/links/UserLink';
import {User} from '../../../../models/User';

type EventListItemUsers = {
  users?: User[];
};

const EventListItemUsers = ({users}: EventListItemUsers) => (
  <>
    {users?.map((u, index) => (
      <Text key={index}>
        {index > 0 && <>, </>}
        <UserLink user={u} />
      </Text>
    ))}
  </>
);

export default EventListItemUsers;
