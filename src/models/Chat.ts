import {AbstractAuditing} from './AbstractAuditing';
import {Message} from './Message';

export interface ChatInfo {
  id: string;
  title: string;
  members: string[];
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

export const buildDirectChat = (message: Message, secondUserId: string): Chat => ({
  id: message.chatId,
  title: undefined,
  isDirect: true,
  members: [
    {chatId: message.chatId, userId: message.userId},
    {chatId: message.chatId, userId: secondUserId},
  ],
  lastMessage: message,
});
