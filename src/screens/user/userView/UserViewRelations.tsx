import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import UserSelectors from '../../../store/user/userSelectors';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import UserViewRelation from './UserViewRelation';

const UserViewGroups = () => {
  const {t} = useTranslation();
  const relations = useAppSelector(UserSelectors.relations);

  return (
    <FVStack space="3">
      <Text color="primary.500" fontWeight="bold">
        {t('user:commonContacts.header')}: {relations.length}
      </Text>
      {relations.length === 0 && <Text color="gray.400">{t('user:commonContacts.noCommonContacts')}</Text>}
      {relations.map((relation) => (
        <UserViewRelation relation={relation} key={relation.id} />
      ))}
    </FVStack>
  );
};

export default UserViewGroups;
