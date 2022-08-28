import * as React from 'react';
import {ComponentType, useEffect, useRef} from 'react';
import WsClient from '../../../components/ws/WsClient';
import {WS_ROOT_TOPIC, WS_URL} from '../../../constants';
import {WsEvent} from '../../../models/Ws';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {WsEventHandler} from './WsEventHandler';
import {WsStateHandler} from './WsStateHandler';
import {WsPushHandler} from './WsPushHandler';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';

const withWsClient = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const isActive = useAppSelector(AuthSelectors.isActive);
  const {t} = useTranslation();
  const wsStateHandler = useRef<WsStateHandler>();
  const wsEventHandler = useRef<WsEventHandler>();
  const wsPushHandler = useRef<WsPushHandler>();

  const onMessage = (msg: WsEvent<any>): void => {
    msg.payload = JSON.parse(msg.payload);
    wsStateHandler.current.handleMessage(msg);
    wsEventHandler.current.handleMessage(msg);
    !isActive && wsPushHandler.current.handleMessage(msg);
  };

  useEffect(() => {
    wsStateHandler.current = new WsStateHandler(dispatch, account);
    wsEventHandler.current = new WsEventHandler(dispatch, account);
    wsPushHandler.current = new WsPushHandler(dispatch, t);
  }, [account]);

  return (
    <>
      <Component {...props} />
      <WsClient active={isActive} url={WS_URL} topics={[WS_ROOT_TOPIC]} onMessage={onMessage} />
    </>
  );
};

export default withWsClient;
