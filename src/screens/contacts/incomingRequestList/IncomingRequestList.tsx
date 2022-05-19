import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import FScrollView from '../../../components/surfaces/FScrollView';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FVStack from '../../../components/surfaces/FVStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListContainer from './IncomingRequestListContainer';

const IncomingRequestList = () => {
  const {incomingRequests} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
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
    const userIds = incomingRequests.map((r) => r.requesterId);
    handleUserIds(userIds);
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

export default flowRight([withUserList])(IncomingRequestList);
