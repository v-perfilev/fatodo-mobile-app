import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import UserSelectors from '../../../store/user/userSelectors';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import UserViewGroup from './UserViewGroup';

const UserViewGroups = () => {
  const {t} = useTranslation();
  const groups = useAppSelector(UserSelectors.groups);

  return (
    <FVStack defaultSpace>
      <Text color="secondary.500" fontSize="md" fontWeight="bold">
        {t('user:commonGroups.header')}
      </Text>
      {groups.length === 0 && <Text color="gray.400">{t('user:commonGroups.noCommonGroups')}</Text>}
      {groups.map((group) => (
        <UserViewGroup group={group} key={group.id} />
      ))}
    </FVStack>
  );
};

export default UserViewGroups;
