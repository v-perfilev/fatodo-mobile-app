import React, {useEffect, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListItems from './IncomingRequestListItems';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

const IncomingRequestList = () => {
  const dispatch = useAppDispatch();
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);
  const users = useAppSelector(InfoSelectors.users);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useDelayedState();

  const resetUserRequests = (): void => {
    setUserRequests([]);
    setLoading(false);
  };

  const combineRequestsWithUsers = (): void => {
    const userRequests = incomingRequests
      .filter((r) => users.has(r.requesterId))
      .map((r) => ({...r, user: users.get(r.requesterId)}))
      .filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(ContactsThunks.fetchIncomingRequests());
  }, []);

  useEffect(() => {
    if (users?.size > 0 && incomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (incomingRequests.length === 0) {
      resetUserRequests();
    }
  }, [users, incomingRequests]);

  return (
    <ConditionalSpinner loading={loading}>
      <IncomingRequestListItems requests={userRequests} />
    </ConditionalSpinner>
  );
};

export default IncomingRequestList;
