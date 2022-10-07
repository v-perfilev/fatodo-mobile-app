import React, {memo} from 'react';
import {useAppSelector} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import UserSelectors from '../../../store/user/userSelectors';

const UserViewHeader = () => {
  const user = useAppSelector(UserSelectors.user);

  return <Header title={user?.username} />;
};

export default memo(UserViewHeader);
