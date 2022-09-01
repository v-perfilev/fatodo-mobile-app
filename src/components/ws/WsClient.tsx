import React, {useEffect, useRef, useState} from 'react';
import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX} from '../../constants';
import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {CompatClient, IMessage, Stomp, StompHeaders, StompSubscription} from '@stomp/stompjs';
import {Box} from 'native-base';
import SockJS from 'sockjs-client';

type WsClientProps = {
  active: boolean;
  url: string;
  topics: string[];
  onMessage: (msg: any, topic: string) => void;
  debug?: boolean;
};

const WsClient = ({active, url, topics, onMessage, debug}: WsClientProps) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const [token, setToken] = useState<string>();
  const [connected, setConnected] = useState<boolean>(false);
  const stompClient = useRef<CompatClient>();
  const subscriptionMap = useRef<Map<string, StompSubscription>>(new Map());

  const headers: StompHeaders = {[AUTHORIZATION_HEADER]: AUTHORIZATION_PREFIX + token};

  const onConnected = (logMsg: string) => (): void => {
    console.info(logMsg);
    subscriptionMap.current.clear();
    setConnected(true);
  };

  const onDisconnected = (logMsg: string) => (): void => {
    console.info(logMsg);
    stompClient.current = undefined;
    subscriptionMap.current.clear();
    setConnected(false);
  };

  const connect = (): void => {
    const onConnect = onConnected('Connected to WebSocket');
    const onError = onDisconnected('Error while connecting WebSocket');
    const onClose = onDisconnected('WebSocket connection closed');
    const sockjsFactory = () => new SockJS(url);
    stompClient.current = Stomp.over(sockjsFactory);
    stompClient.current.heartbeatOutgoing = 1000;
    stompClient.current.reconnectDelay = 5000;
    if (!debug) {
      stompClient.current.debug = () => {};
    }
    stompClient.current.connect(headers, onConnect, onError, onClose);
  };

  const disconnect = (): void => {
    const onDisconnect = onDisconnected('Disconnected from WebSocket');
    stompClient.current?.disconnect(onDisconnect, headers);
  };

  const subscribe = (topic: string): void => {
    const onStompClientMessage = (message: IMessage): void => onMessage(JSON.parse(message.body), topic);
    const subscription = stompClient.current?.subscribe(topic, onStompClientMessage, headers);
    subscription && subscriptionMap.current.set(topic, subscription);
  };

  const unsubscribe = (topic: string): void => {
    const subscription = subscriptionMap.current.get(topic);
    subscriptionMap.current.delete(topic);
    subscription?.unsubscribe(headers);
  };

  const updateSubscriptions = (): void => {
    const topicsToSubscribe = topics.filter((topic) => !subscriptionMap.current.has(topic));
    const topicsToUnsubscribe = Array.from(subscriptionMap.current.keys()).filter((topic) => !topic.includes(topic));
    topicsToSubscribe.forEach((topic) => subscribe(topic));
    topicsToUnsubscribe.forEach((topic) => unsubscribe(topic));
  };

  useEffect(() => {
    isAuthenticated ? SecurityUtils.getAuthToken().then(setToken) : setToken(undefined);
  }, [isAuthenticated]);

  useEffect(() => {
    active && token ? connect() : disconnect();
  }, [active, token]);

  useEffect(() => {
    connected && updateSubscriptions();
  }, [connected, topics]);

  return <Box />;
};

export default WsClient;
