import React, {useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import OutcomingRequestListContainer from './OutcomingRequestListContainer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const users = useAppSelector(InfoSelectors.users);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useDelayedState();

  const load = async (): Promise<void> => {
    setLoading(true);
    await dispatch(ContactsThunks.fetchOutcomingRequests());
  };

  const resetUserRequests = (): void => {
    setUserRequests([]);
    setLoading(false);
  };

  const combineRequestsWithUsers = (): void => {
    const userRequests = outcomingRequests
      .filter((r) => users.has(r.recipientId))
      .map((r) => ({...r, user: users.get(r.recipientId)}))
      .filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    load().finally();
  }, []);

  useEffect(() => {
    if (users?.size > 0 && outcomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (outcomingRequests.length === 0) {
      resetUserRequests();
    }
  }, [users, outcomingRequests]);

  return (
    <ConditionalSpinner loading={loading}>
      <OutcomingRequestListContainer load={load} requests={userRequests} />
    </ConditionalSpinner>
  );
};

export default OutcomingRequestList;
