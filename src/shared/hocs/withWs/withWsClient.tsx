import * as React from 'react';
import {ComponentType, useEffect, useRef} from 'react';
import WsClient from '../../../components/ws/WsClient';
import {flowRight} from 'lodash';
import withWsChat from './withWsChat';
import withWsComment from './withWsComment';
import withWsEvent from './withWsEvent';
import withWsContact from './withWsContact';
import {WS_ROOT_TOPIC, WS_URL} from '../../../constants';
import {WsEvent} from '../../../models/Ws';
import {useAppDispatch} from '../../../store/store';
import {WsEventHandler} from './WsEventHandler';
import {WsStateHandler} from './WsStateHandler';
import {WsPushHandler} from './WsPushHandler';

const withWsClient = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const wsStateHandler = useRef<WsStateHandler>();
  const wsEventHandler = useRef<WsEventHandler>();
  const wsPushHandler = useRef<WsPushHandler>();

  const onMessage = (msg: WsEvent<any>): void => {
    wsStateHandler.current.handleMessage(msg);
    wsEventHandler.current.handleMessage(msg);
    wsPushHandler.current.handleMessage(msg);
  };

  useEffect(() => {
    wsStateHandler.current = new WsStateHandler(dispatch);
    wsEventHandler.current = new WsEventHandler(dispatch);
    wsPushHandler.current = new WsPushHandler(dispatch);
  }, []);

  return (
    <>
      <Component {...props} />
      <WsClient url={WS_URL} topics={[WS_ROOT_TOPIC]} onMessage={onMessage} />
    </>
  );
};

export default flowRight([withWsClient, withWsChat, withWsComment, withWsEvent, withWsContact]);
