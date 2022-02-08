import {AbstractAuditing} from './AbstractAuditing';

export const messageReactionTypes = ['LIKE', 'DISLIKE'];

export type MessageStatusType = 'READ';
export type MessageReactionType = 'LIKE' | 'DISLIKE';

export interface Message extends AbstractAuditing {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  reference: Message;

  isDeleted: boolean;
  isEvent: boolean;

  statuses: MessageStatus[];
  reactions: MessageReaction[];
}

export interface MessageStatus {
  messageId: string;
  userId: string;
  type: MessageStatusType;
  timestamp: Date;
}

export interface MessageReaction {
  messageId: string;
  userId: string;
  type: MessageReactionType;
  timestamp: Date;
}

export interface MessageStatuses {
  chatId: string;
  messageId: string;
  statuses: MessageStatus[];
}

export interface MessageReactions {
  chatId: string;
  messageId: string;
  reactions: MessageReaction[];
}

export interface EventMessageParams {
  type: EventMessageType;
  text?: string;
  ids?: string[];
}

export enum EventMessageType {
  CREATE_DIRECT_CHAT = 'CREATE_DIRECT_CHAT',
  CREATE_CHAT = 'CREATE_CHAT',
  RENAME_CHAT = 'RENAME_CHAT',
  LEAVE_CHAT = 'LEAVE_CHAT',
  ADD_MEMBERS = 'ADD_MEMBERS',
  DELETE_MEMBERS = 'DELETE_MEMBERS',
}
