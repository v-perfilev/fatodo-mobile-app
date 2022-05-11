import * as React from 'react';
import {ComponentType, PropsWithChildren, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import {ReduxAuthState} from '../../../store/rerducers/AuthReducer';
import {useSnackContext} from '../../contexts/SnackContext';
import {ContactRelation} from '../../../models/ContactRelation';
import {ContactRequest} from '../../../models/ContactRequest';
import {ContactContext} from '../../contexts/contactContexts/contactContext';
import withAuthState from '../withAuthState';
import ContactService from '../../../services/ContactService';

type Props = ReduxAuthState & PropsWithChildren<HTMLElement>;

const withContacts = (Component: ComponentType) => (props: Props) => {
  const {isAuthenticated} = props;
  const {handleResponse} = useSnackContext();
  const [relations, setRelations] = useState<ContactRelation[]>([]);
  const [outcomingRequests, setOutcomingRequests] = useState<ContactRequest[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [relationsLoading, setRelationsLoading] = useState<boolean>(false);
  const [outcomingRequestsLoading, setOutcomingRequestsLoading] = useState<boolean>(false);
  const [incomingRequestsLoading, setIncomingRequestsLoading] = useState<boolean>(false);

  const loadRelations = (): void => {
    setRelationsLoading(true);
    ContactService.getAllRelations()
      .then((response) => {
        setRelations(response.data);
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setRelationsLoading(false);
      });
  };

  const loadOutcomingRequests = (): void => {
    setOutcomingRequestsLoading(true);
    ContactService.getOutcomingRequests()
      .then((response) => {
        setOutcomingRequests(response.data);
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setOutcomingRequestsLoading(false);
      });
  };

  const loadIncomingRequests = (): void => {
    setIncomingRequestsLoading(true);
    ContactService.getIncomingRequests()
      .then((response) => {
        setIncomingRequests(response.data);
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setIncomingRequestsLoading(false);
      });
  };

  const update = (): void => {
    if (isAuthenticated) {
      loadRelations();
      loadOutcomingRequests();
      loadIncomingRequests();
    }
  };

  useEffect(() => {
    update();
  }, [isAuthenticated]);

  useEffect(() => {
    setLoading(relationsLoading || outcomingRequestsLoading || incomingRequestsLoading);
  }, [relationsLoading, outcomingRequestsLoading, incomingRequestsLoading]);

  const context = {relations, outcomingRequests, incomingRequests, update, loading};

  return (
    <ContactContext.Provider value={context}>
      <Component {...props} />
    </ContactContext.Provider>
  );
};

export default flowRight([withAuthState, withContacts]);
