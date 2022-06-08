import * as React from 'react';
import {ComponentType, useState} from 'react';
import {WsContext, WsTopicsAndHandler} from '../contexts/WsContext';
import WsClient from '../../components/ws/WsClient';

const withWsClient = (Component: ComponentType) => (props: any) => {
  const [topicsAndHandlers, setTopicsAndHandlers] = useState<Map<string, WsTopicsAndHandler>>(new Map());

  const setTopicsAndHandler = (key: string, topicsAndHandler: WsTopicsAndHandler): void => {
    setTopicsAndHandlers((prevState) => {
      prevState.set(key, topicsAndHandler);
      return new Map(prevState);
    });
  };

  const removeTopicsAndHandler = (key: string): void => {
    setTopicsAndHandlers((prevState) => {
      if (prevState.has(key)) {
        prevState.delete(key);
      }
      return new Map(prevState);
    });
  };

  const topics = Array.from(topicsAndHandlers.values())
    .map((topicsAndHandler) => topicsAndHandler.topics)
    .reduce((acc, topics) => [...acc, ...topics], []);

  const onMessage = (msg: any, topic: string): void => {
    Array.from(topicsAndHandlers.values())
      .map((topicsAndHandler) => topicsAndHandler.handler)
      .forEach((handler) => handler(msg, topic));
  };

  const context = {
    setTopicsAndHandler,
    removeTopicsAndHandler,
  };

  return (
    <WsContext.Provider value={context}>
      <Component {...props} />
      <WsClient topics={topics} onMessage={onMessage} />
    </WsContext.Provider>
  );
};

export default withWsClient;
