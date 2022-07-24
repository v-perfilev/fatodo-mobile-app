import React, {useEffect, useState} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import UserSelectors from '../../../store/user/userSelectors';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import UserViewRelation from './UserViewRelation';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelationWithUser} from '../../../models/ContactRelation';

const UserViewGroups = () => {
  const {t} = useTranslation();
  const relations = useAppSelector(UserSelectors.relations);
  const users = useAppSelector(InfoSelectors.users);
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);

  const combineRelationsWithUsers = (): void => {
    const userRelations = relations
      .filter((r) => users.has(r.secondUserId))
      .map((r) => ({...r, user: users.get(r.secondUserId)}))
      .filter((r) => r.user);
    setUserRelations(userRelations);
  };

  const resetUserRelations = (): void => {
    setUserRelations([]);
  };

  useEffect(() => {
    if (users?.size > 0 && relations?.length > 0) {
      combineRelationsWithUsers();
    } else if (relations?.length === 0) {
      resetUserRelations();
    }
  }, [relations, users]);

  return (
    <FVStack defaultSpace>
      <Text color="secondary.500" fontSize="md" fontWeight="bold">
        {t('user:commonContacts.header')}: {userRelations.length}
      </Text>
      {userRelations.length === 0 && <Text color="gray.400">{t('user:commonContacts.noCommonContacts')}</Text>}
      {userRelations.map((relation) => (
        <UserViewRelation relation={relation} key={relation.id} />
      ))}
    </FVStack>
  );
};

export default UserViewGroups;