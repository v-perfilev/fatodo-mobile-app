import {AbstractAuditing} from './AbstractAuditing';
import {ID_STUB} from '../constants';

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
  CLEAR_CHAT = 'CLEAR_CHAT',
  ADD_MEMBERS = 'ADD_MEMBERS',
  DELETE_MEMBERS = 'DELETE_MEMBERS',
}

export const buildEventMessage = (userId: string, type: EventMessageType, ids: string[]): Message => {
  const params = {type, ids} as EventMessageParams;
  return {
    id: ID_STUB,
    chatId: undefined,
    userId,
    text: JSON.stringify(params),
    reference: undefined,
    isDeleted: false,
    isEvent: true,
    statuses: [],
    reactions: [],
  };
};

export const buildMessageReaction = (
  messageId: string,
  userId: string,
  type: MessageReactionType,
): MessageReaction => ({
  messageId,
  userId,
  type,
  timestamp: new Date(),
});

export const buildMessageStatus = (messageId: string, userId: string, type: MessageStatusType): MessageStatus => ({
  messageId,
  userId,
  type,
  timestamp: new Date(),
});
