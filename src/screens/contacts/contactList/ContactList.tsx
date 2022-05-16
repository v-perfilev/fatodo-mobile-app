import React, {useEffect, useState} from 'react';
import withHeader from '../../../shared/hocs/withHeader';
import {flowRight} from 'lodash';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ContactListContainer from './ContactListContainer';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import {useTranslation} from 'react-i18next';
import FScrollView from '../../../components/surfaces/FScrollView';
import FVStack from '../../../components/surfaces/FVStack';

const ContactList = () => {
  const {t} = useTranslation();
  const {relations} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useLoadingState();
  const [filter, setFilter] = useState<string>('');

  const resetUserRelations = (): void => {
    setUserRelations([]);
    setLoading(false);
  };

  const combineRelationsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRelations = relations
      .filter((r) => userMap.has(r.secondUserId))
      .map((r) => ({...r, user: userMap.get(r.secondUserId)}))
      .filter((r) => r.user);
    setUserRelations(userRelations);
    setLoading(false);
  };

  useEffect(() => {
    const userIds = relations.map((r) => r.secondUserId);
    handleUserIds(userIds);
  }, [relations]);

  useEffect(() => {
    if (users?.length > 0 && relations?.length > 0) {
      combineRelationsWithUsers();
    } else if (relations?.length === 0) {
      resetUserRelations();
    }
  }, [relations, users]);

  return (
    <ConditionalSpinner loading={loading}>
      <FScrollView>
        <FVStack>
          <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={setFilter} />
          <ContactListContainer relations={userRelations} filter={filter} />
        </FVStack>
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader, withUserList])(ContactList);
