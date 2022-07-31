import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useWsContext} from '../../contexts/WsContext';
import {useAppDispatch} from '../../../store/store';
import {ContactsActions} from '../../../store/contacts/contactsActions';

enum WsContactDestinations {
  CONTACT_REQUEST_INCOMING = '/user/contact/request-incoming',
  CONTACT_REQUEST_OUTCOMING = '/user/contact/request-outcoming',
  CONTACT_ACCEPT_INCOMING = '/user/contact/accept-incoming',
  CONTACT_ACCEPT_OUTCOMING = '/user/contact/accept-outcoming',
}

const withWsContact = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsContactDestinations.CONTACT_REQUEST_INCOMING)) {
      dispatch(ContactsActions.addIncomingRequest(msg));
    } else if (topic.startsWith(WsContactDestinations.CONTACT_REQUEST_OUTCOMING)) {
      dispatch(ContactsActions.addOutcomingRequest(msg));
    } else if (topic.startsWith(WsContactDestinations.CONTACT_ACCEPT_INCOMING)) {
      dispatch(ContactsActions.acceptIncomingRequest(msg));
    } else if (topic.startsWith(WsContactDestinations.CONTACT_ACCEPT_OUTCOMING)) {
      dispatch(ContactsActions.acceptOutcomingRequest(msg));
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    return [
      WsContactDestinations.CONTACT_REQUEST_INCOMING,
      WsContactDestinations.CONTACT_REQUEST_OUTCOMING,
      WsContactDestinations.CONTACT_ACCEPT_INCOMING,
      WsContactDestinations.CONTACT_ACCEPT_OUTCOMING,
    ];
  }, []);

  useEffect(() => {
    setTopicsAndHandler('WS_CONTACT', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_CONTACT');
  }, []);

  return <Component {...props} />;
};

export default withWsContact;
