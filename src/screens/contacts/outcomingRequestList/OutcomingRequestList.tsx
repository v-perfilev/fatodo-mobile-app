import React, {useEffect} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import OutcomingRequestListContainer from './OutcomingRequestListContainer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    dispatch(ContactsThunks.fetchOutcomingRequests()).finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <OutcomingRequestListContainer requests={outcomingRequests} />
    </ConditionalSpinner>
  );
};

export default OutcomingRequestList;
