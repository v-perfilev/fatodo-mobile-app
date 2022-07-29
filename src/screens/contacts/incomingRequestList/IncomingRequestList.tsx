import React, {useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import IncomingRequestListContainer from './IncomingRequestListContainer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

const IncomingRequestList = () => {
  const dispatch = useAppDispatch();
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    dispatch(ContactsThunks.fetchIncomingRequests()).finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <IncomingRequestListContainer requests={incomingRequests} />
    </ConditionalSpinner>
  );
};

export default IncomingRequestList;
