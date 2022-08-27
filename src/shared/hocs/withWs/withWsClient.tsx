import * as React from 'react';
import {ComponentType, useEffect, useRef} from 'react';
import WsClient from '../../../components/ws/WsClient';
import {WS_ROOT_TOPIC, WS_URL} from '../../../constants';
import {WsEvent} from '../../../models/Ws';
import {useAppDispatch} from '../../../store/store';
import {WsEventHandler} from './WsEventHandler';
import {WsStateHandler} from './WsStateHandler';
import {WsPushHandler} from './WsPushHandler';

const withWsClient = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const wsEventHandler = useRef<WsEventHandler>();
  const wsStateHandler = useRef<WsStateHandler>();
  const wsPushHandler = useRef<WsPushHandler>();

  const onMessage = (msg: WsEvent<any>): void => {
    wsEventHandler.current.handleMessage(msg);
    wsStateHandler.current.handleMessage(msg);
    wsPushHandler.current.handleMessage(msg);
  };

  useEffect(() => {
    wsEventHandler.current = new WsEventHandler(dispatch);
    wsStateHandler.current = new WsStateHandler(dispatch);
    wsPushHandler.current = new WsPushHandler(dispatch);
  }, []);

  return (
    <>
      <Component {...props} />
      <WsClient url={WS_URL} topics={[WS_ROOT_TOPIC]} onMessage={onMessage} />
    </>
  );
};

export default withWsClient;
