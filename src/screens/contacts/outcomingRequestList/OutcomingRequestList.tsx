import React, {useEffect, useState} from 'react';
import FScrollView from '../../../components/boxes/FScrollView';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FVStack from '../../../components/boxes/FVStack';
import OutcomingRequestListContainer from './OutcomingRequestListContainer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactsThunks from '../../../store/contacts/contactsThunks';
import UsersSelectors from '../../../store/users/usersSelectors';
import UsersThunks from '../../../store/users/usersThunks';

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
    const userIds = outcomingRequests.map((r) => r.recipientId);
    dispatch(UsersThunks.handleUserIds(userIds));
  }, [outcomingRequests]);

  useEffect(() => {
    if (users?.length > 0 && outcomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (outcomingRequests.length === 0) {
      resetUserRequests();
    }
  }, [users, outcomingRequests]);

  return (
    <ConditionalSpinner loading={loading}>
      <FScrollView>
        <FVStack grow>
          <OutcomingRequestListContainer requests={userRequests} />
        </FVStack>
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default OutcomingRequestList;
