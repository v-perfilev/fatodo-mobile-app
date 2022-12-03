import * as React from 'react';
import {ComponentType, memo, useEffect, useRef} from 'react';
import WsClient from '../../../components/ws/WsClient';
import {WS_ROOT_TOPIC, WS_URL} from '../../../constants';
import {WsEvent} from '../../../models/Ws';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {WsEventHandler} from './WsEventHandler';
import {WsStateHandler} from './WsStateHandler';
import {WsPushHandler} from './WsPushHandler';
import AuthSelectors from '../../../store/auth/authSelectors';
import {flowRight} from 'lodash';
import {useSoundContext} from '../../contexts/SoundContext';

const withWsClient = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const sounds = useSoundContext();
  const account = useAppSelector(AuthSelectors.account);
  const isActive = useAppSelector(AuthSelectors.isActive);
  const wsStateHandler = useRef<WsStateHandler>();
  const wsEventHandler = useRef<WsEventHandler>();
  const wsPushHandler = useRef<WsPushHandler>();

  const onMessage = (msg: WsEvent<any>): void => {
    msg.payload = JSON.parse(msg.payload);
    wsStateHandler.current?.handleMessage(msg);
    wsEventHandler.current?.handleMessage(msg);
    wsPushHandler.current?.handleMessage(msg);
  };

  useEffect(() => {
    if (account) {
      wsStateHandler.current = new WsStateHandler(dispatch, account);
      wsEventHandler.current = new WsEventHandler(dispatch, account);
      wsPushHandler.current = new WsPushHandler(dispatch, account, sounds);
    } else {
      wsStateHandler.current = undefined;
      wsEventHandler.current = undefined;
      wsPushHandler.current = undefined;
    }
  }, [account]);

  return (
    <>
      <Component {...props} />
      <WsClient active={isActive} url={WS_URL} topics={[WS_ROOT_TOPIC]} onMessage={onMessage} />
    </>
  );
};

export default flowRight([memo, withWsClient]);
