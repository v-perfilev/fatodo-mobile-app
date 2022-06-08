import {createContext, useContext} from 'react';

export type WsTopicsAndHandler = {
  topics: string[];
  handler: (msg: any, topic: string) => void;
};

type WsState = {
  setTopicsAndHandler: (key: string, topicsAndHandler: WsTopicsAndHandler) => void;
  removeTopicsAndHandler: (key: string) => void;
};

export const WsContext = createContext<WsState>(null);
export const useWsContext = (): WsState => useContext(WsContext);
