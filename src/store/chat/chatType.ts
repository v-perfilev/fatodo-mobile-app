import {Chat} from '../../models/Chat';

export type ChatState = {
  chat: Chat;
  messages: [];
  loading: boolean;
  allLoaded: boolean;
};
