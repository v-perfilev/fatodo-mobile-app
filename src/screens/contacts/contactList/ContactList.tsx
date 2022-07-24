import React, {useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import ContactListControl from './ContactListControl';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import ContactListContainer from './ContactListContainer';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const users = useAppSelector(InfoSelectors.users);
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useDelayedState();
  const [filter, setFilter] = useState<string>('');

  const resetUserRelations = (): void => {
    setUserRelations([]);
    setLoading(false);
  };

  const combineRelationsWithUsers = (): void => {
    const userRelations = relations
      .filter((r) => users.has(r.secondUserId))
      .map((r) => ({...r, user: users.get(r.secondUserId)}))
      .filter((r) => r.user);
    setUserRelations(userRelations);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(ContactsThunks.fetchRelations());
  }, []);

  useEffect(() => {
    if (users?.size > 0 && relations?.length > 0) {
      combineRelationsWithUsers();
    } else if (relations?.length === 0) {
      resetUserRelations();
    }
  }, [relations, users]);

  return (
    <>
      <ContactListControl setFilter={setFilter} />
      <ConditionalSpinner loading={loading}>
        <ContactListContainer relations={userRelations} filter={filter} />
      </ConditionalSpinner>
    </>
  );
};

export default ContactList;
