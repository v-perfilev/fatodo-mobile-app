import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useWsContext} from '../../contexts/WsContext';

enum WsContactDestinations {
  CONTACT_REQUEST_INCOMING = '/user/contact/request-incoming',
  CONTACT_REQUEST_OUTCOMING = '/user/contact/request-outcoming',
  CONTACT_ACCEPT_INCOMING = '/user/contact/accept-incoming',
  CONTACT_ACCEPT_OUTCOMING = '/user/contact/accept-outcoming',
}

const withWsContact = (Component: ComponentType) => (props: any) => {
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsContactDestinations.CONTACT_REQUEST_INCOMING)) {
      // TODO
    } else if (topic.startsWith(WsContactDestinations.CONTACT_REQUEST_OUTCOMING)) {
      // TODO
    } else if (topic.startsWith(WsContactDestinations.CONTACT_ACCEPT_INCOMING)) {
      // TODO
    } else if (topic.startsWith(WsContactDestinations.CONTACT_ACCEPT_OUTCOMING)) {
      // TODO
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
