import React, {useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import OutcomingRequestListItems from './OutcomingRequestListItems';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import UsersSelectors from '../../../store/users/usersSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const users = useAppSelector(UsersSelectors.users);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useDelayedState();

  const resetUserRequests = (): void => {
    setUserRequests([]);
    setLoading(false);
  };

  const combineRequestsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRequests = outcomingRequests
      .filter((r) => userMap.has(r.recipientId))
      .map((r) => ({...r, user: userMap.get(r.recipientId)}))
      .filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(ContactsThunks.fetchOutcomingRequests());
  }, []);

  useEffect(() => {
    if (users?.length > 0 && outcomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (outcomingRequests.length === 0) {
      resetUserRequests();
    }
  }, [users, outcomingRequests]);

  return (
    <ConditionalSpinner loading={loading}>
      <OutcomingRequestListItems requests={userRequests} />
    </ConditionalSpinner>
  );
};

export default OutcomingRequestList;
