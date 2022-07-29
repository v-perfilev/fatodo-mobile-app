import React, {useEffect, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactListControl from './ContactListControl';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import ContactListContainer from './ContactListContainer';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const [loading, setLoading] = useDelayedState();
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    dispatch(ContactsThunks.fetchRelations()).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ContactListControl setFilter={setFilter} />
      <ConditionalSpinner loading={loading}>
        <ContactListContainer relations={relations} filter={filter} />
      </ConditionalSpinner>
    </>
  );
};

export default ContactList;
