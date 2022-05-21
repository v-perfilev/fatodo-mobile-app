import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import FScrollView from '../../../components/surfaces/FScrollView';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FVStack from '../../../components/surfaces/FVStack';
import OutcomingRequestListContainer from './OutcomingRequestListContainer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactSelectors from '../../../store/contact/contactSelectors';
import ContactThunks from '../../../store/contact/contactThunks';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const outcomingRequests = useAppSelector(ContactSelectors.outcomingRequestsSelector);
  const {users, handleUserIds} = useUserListContext();
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useLoadingState();

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
    dispatch(ContactThunks.fetchOutcomingRequests());
  }, []);

  useEffect(() => {
    const userIds = outcomingRequests.map((r) => r.recipientId);
    handleUserIds(userIds);
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

export default flowRight([withUserList])(OutcomingRequestList);
