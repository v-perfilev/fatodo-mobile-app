import {Chat} from '../../models/Chat';
import {Message} from '../../models/Message';
import {ChatItem} from '../../models/ChatItem';

export type ChatState = {
  chat: Chat;
  messages: Message[];
  chatItems: ChatItem[];
  loading: boolean;
  allLoaded: boolean;
};
