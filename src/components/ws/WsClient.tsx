import React, {useEffect, useState} from 'react';
// @ts-ignore
import SockJsClient from 'react-stomp';
import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX, WS_URL} from '../../constants';
import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

type WsClientProps = {
  topics: string[];
  onMessage: (msg: any, topic: string) => void;
};

const WsClient = ({topics, onMessage}: WsClientProps) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const [token, setToken] = useState<string>();

  const headers = {[AUTHORIZATION_HEADER]: AUTHORIZATION_PREFIX + token};

  useEffect(() => {
    if (isAuthenticated) {
      SecurityUtils.getAuthToken().then(setToken);
    } else {
      setToken(undefined);
    }
  }, [isAuthenticated]);

  return token ? (
    <SockJsClient headers={headers} url={WS_URL} topics={topics} onMessage={onMessage} debug={true} />
  ) : null;
};

export default WsClient;
