import React, {useEffect, useState} from 'react';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FVStack from '../../../components/surfaces/FVStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListContainer from './IncomingRequestListContainer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactsThunks from '../../../store/contacts/contactsThunks';
import UsersSelectors from '../../../store/users/usersSelectors';
import UsersThunks from '../../../store/users/usersThunks';

const IncomingRequestList = () => {
  const dispatch = useAppDispatch();
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);
  const users = useAppSelector(UsersSelectors.users);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useLoadingState();

  const resetUserRequests = (): void => {
    setUserRequests([]);
    setLoading(false);
  };

  const combineRequestsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRequests = incomingRequests
      .filter((r) => userMap.has(r.requesterId))
      .map((r) => ({...r, user: userMap.get(r.requesterId)}))
      .filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    dispatch(ContactsThunks.fetchIncomingRequests());
  }, []);

  useEffect(() => {
    const userIds = incomingRequests.map((r) => r.requesterId);
    dispatch(UsersThunks.handleUserIds(userIds));
  }, [incomingRequests]);

  useEffect(() => {
    if (users?.length > 0 && incomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (incomingRequests.length === 0) {
      resetUserRequests();
    }
  }, [users, incomingRequests]);

  return (
    <ConditionalSpinner loading={loading}>
      <FScrollView>
        <FVStack grow>
          <IncomingRequestListContainer requests={userRequests} />
        </FVStack>
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default IncomingRequestList;
