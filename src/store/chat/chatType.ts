import {Chat} from '../../models/Chat';
import {ChatItem, Message} from '../../models/Message';

export type ChatState = {
  chat: Chat;
  messages: Message[];
  chatItems: ChatItem[];
  loading: boolean;
  moreLoading: boolean;
  allLoaded: boolean;
};
