import {AbstractAuditing} from './AbstractAuditing';
import {Message} from './Message';

export interface Chat extends AbstractAuditing {
  id: string;
  title: string;
  isDirect: boolean;

  members: string[];
  lastMessage: Message;
}

export const buildDirectChat = (message: Message, secondUserId: string): Chat => ({
  id: message.chatId,
  title: undefined,
  isDirect: true,
  members: [message.userId, secondUserId],
  lastMessage: message,
});
