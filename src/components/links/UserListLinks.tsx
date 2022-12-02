import React from 'react';
import {Text} from 'native-base';
import UserLink from './UserLink';
import {User} from '../../models/User';

type UserListLinks = {
  users?: User[];
  noLink?: boolean;
};

const UserListLInks = ({users, noLink}: UserListLinks) => (
  <>
    {users?.map((u, index) => (
      <Text key={index}>
        {index > 0 && <>, </>}
        <UserLink user={u} noLink={noLink} />
      </Text>
    ))}
  </>
);

export default UserListLInks;
