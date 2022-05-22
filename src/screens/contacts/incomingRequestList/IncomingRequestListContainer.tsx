import React from 'react';
import FVStack from '../../../components/surfaces/FVStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListStub from './IncomingRequestListStub';
import IncomingRequestListItem from './IncomingRequestListItem';

type IncomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const IncomingRequestListContainer = ({requests}: IncomingRequestListContainerProps) => {
  return (
    <>
      {requests.length === 0 && <IncomingRequestListStub />}
      {requests.length > 0 && (
        <FVStack>
          {requests.map((request) => (
            <IncomingRequestListItem request={request} key={request.id} />
          ))}
        </FVStack>
      )}
    </>
  );
};

export default IncomingRequestListContainer;