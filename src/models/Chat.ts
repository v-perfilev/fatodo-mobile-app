import {AbstractAuditing} from './AbstractAuditing';
import {Message} from './Message';

export interface ChatInfo {
  id: string;
  title: string;
  members: ChatMember[];
}

export interface Chat extends AbstractAuditing {
  id: string;
  title: string;
  isDirect: boolean;

  members: ChatMember[];
  lastMessage: Message;
}

export interface ChatMember {
  chatId: string;
  userId: string;
}
