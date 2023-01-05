import React, {memo} from 'react';
import {useAppSelector} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import UserSelectors from '../../../store/user/userSelectors';
import {useTranslation} from 'react-i18next';
import {UserUtils} from '../../../shared/utils/UserUtils';

const UserViewHeader = () => {
  const user = useAppSelector(UserSelectors.user);
  const {t} = useTranslation();

  return <Header title={UserUtils.getUsername(user, t)} />;
};

export default memo(UserViewHeader);
