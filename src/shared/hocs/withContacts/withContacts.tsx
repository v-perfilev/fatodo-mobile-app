import * as React from 'react';
import {ComponentType, useEffect, useState} from 'react';
import {ContactRelation} from '../../../models/ContactRelation';
import {ContactRequest} from '../../../models/ContactRequest';
import {ContactContext} from '../../contexts/contactContexts/contactContext';
import ContactService from '../../../services/ContactService';
import {useAppSelector} from '../../../store/hooks';
import AuthSelectors from '../../../store/auth/authSelectors';

const withContacts = (Component: ComponentType) => (props: any) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticatedSelector);
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

export default withContacts;
