import {Message} from './Message';

export type ChatItemType = 'event' | 'outcoming' | 'incoming' | null;

export type ChatItem = {
  message?: Message;
  date?: string;
};
