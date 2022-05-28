import React from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import FVStack from '../../../components/boxes/FVStack';
import OutcomingRequestListStub from './OutcomingRequestListStub';
import OutcomingRequestListItem from './OutcomingRequestListItem';

type OutcomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const OutcomingRequestListContainer = ({requests}: OutcomingRequestListContainerProps) => {
  return (
    <>
      {requests.length === 0 && <OutcomingRequestListStub />}
      {requests.length > 0 && (
        <FVStack>
          {requests.map((request) => (
            <OutcomingRequestListItem request={request} key={request.user.id} />
          ))}
        </FVStack>
      )}
    </>
  );
};

export default OutcomingRequestListContainer;
