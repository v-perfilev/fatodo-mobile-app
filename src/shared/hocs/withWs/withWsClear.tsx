import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useWsContext} from '../../contexts/WsContext';
import {ClearEvent} from '../../../models/ClearEvent';

enum WsClearDestinations {
  CLEAR = '/user/clear',
}

const withWsClear = (Component: ComponentType) => (props: any) => {
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsClearDestinations.CLEAR)) {
      const clearEvent = msg as ClearEvent;
      switch (clearEvent.type) {
        case 'GROUP':
          // TODO
          break;
        case 'ITEM':
          // TODO
          break;
        case 'CONTACT':
          // TODO
          break;
        case 'INCOMING_REQUEST':
          // TODO
          break;
        case 'OUTCOMING_REQUEST':
          // TODO
          break;
        case 'CHAT':
          // TODO
          break;
      }
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    return [WsClearDestinations.CLEAR];
  }, []);

  useEffect(() => {
    setTopicsAndHandler('WS_CLEAR', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_CLEAR');
  }, []);

  return <Component {...props} />;
};

export default withWsClear;
