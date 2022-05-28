import React, {useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ContactListContainer from './ContactListContainer';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsThunks from '../../../store/contacts/contactsThunks';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import UsersSelectors from '../../../store/users/usersSelectors';
import UsersThunks from '../../../store/users/usersThunks';
import ContactListHeader from './ContactListHeader';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const users = useAppSelector(UsersSelectors.users);
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
    setLoading(true);
    dispatch(ContactsThunks.fetchRelations());
  }, []);

  useEffect(() => {
    const userIds = relations.map((r) => r.secondUserId);
    dispatch(UsersThunks.handleUserIds(userIds));
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
        <FVStack grow defaultSpace>
          <ContactListHeader setFilter={setFilter} />
          <ContactListContainer relations={userRelations} filter={filter} />
        </FVStack>
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default ContactList;
