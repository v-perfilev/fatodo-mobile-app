import * as React from 'react';
import {ComponentType, useEffect, useState} from 'react';
import {useSnackContext} from '../../contexts/SnackContext';
import {ContactInfoContext} from '../../contexts/contactContexts/contactInfoContext';
import ContactService from '../../../services/ContactService';
import {useAppSelector} from '../../../store/hooks';
import AuthSelectors from '../../../store/auth/authSelectors';

const withContactInfo = (Component: ComponentType) => (props: any) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticatedSelector);
  const {handleResponse} = useSnackContext();
  const [relationCount, setRelationCount] = useState<number>(0);
  const [outcomingRequestCount, setOutcomingRequestCount] = useState<number>(0);
  const [incomingRequestCount, setIncomingRequestCount] = useState<number>(0);

  const loadInfo = (): void => {
    ContactService.getInfo()
      .then((response) => {
        const contactInfo = response.data;
        setRelationCount(contactInfo.relationCount);
        setOutcomingRequestCount(contactInfo.outcomingRequestCount);
        setIncomingRequestCount(contactInfo.incomingRequestCount);
      })
      .catch(({response}) => {
        handleResponse(response);
      });
  };

  const update = (): void => {
    if (isAuthenticated) {
      loadInfo();
    }
  };

  useEffect(() => {
    update();
  }, [isAuthenticated]);

  const context = {relationCount, outcomingRequestCount, incomingRequestCount, update};

  return (
    <ContactInfoContext.Provider value={context}>
      <Component {...props} />
    </ContactInfoContext.Provider>
  );
};

export default withContactInfo;
