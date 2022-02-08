import {AbstractAuditing} from './AbstractAuditing';
import {Message} from './Message';

export interface Chat extends AbstractAuditing {
  id: string;
  title: string;
  isDirect: boolean;

  members: string[];
  lastMessage: Message;
}
