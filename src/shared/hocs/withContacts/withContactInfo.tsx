import * as React from 'react';
import {ComponentType, PropsWithChildren, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import {useSnackContext} from '../../contexts/SnackContext';
import {ReduxAuthState} from '../../../store/rerducers/AuthReducer';
import {ContactInfoContext} from '../../contexts/contactContexts/contactInfoContext';
import withAuthState from '../withAuthState';
import ContactService from '../../../services/ContactService';

type BaseProps = PropsWithChildren<HTMLElement>;

type Props = ReduxAuthState & BaseProps;

const withContactInfo = (Component: ComponentType) => (props: Props) => {
  const {isAuthenticated} = props;
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

export default flowRight([withAuthState, withContactInfo]);
