import React, {useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ContactListItems from './ContactListItems';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import UsersSelectors from '../../../store/users/usersSelectors';
import ContactListControl from './ContactListControl';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const users = useAppSelector(UsersSelectors.users);
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useDelayedState();
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
    if (users?.length > 0 && relations?.length > 0) {
      combineRelationsWithUsers();
    } else if (relations?.length === 0) {
      resetUserRelations();
    }
  }, [relations, users]);

  return (
    <>
      <ContactListControl setFilter={setFilter} />
      <ConditionalSpinner loading={loading}>
        <ContactListItems relations={userRelations} filter={filter} />
      </ConditionalSpinner>
    </>
  );
};

export default ContactList;
