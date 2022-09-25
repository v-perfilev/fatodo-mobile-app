import {AbstractAuditing} from './AbstractAuditing';
import {ID_STUB} from '../constants';
import {MessageDTO} from './dto/MessageDTO';
import {DateUtils} from '../shared/utils/DateUtils';

export const messageReactionTypes = ['LIKE', 'DISLIKE'];

export type MessageStatusType = 'READ';
export type MessageReactionType = 'LIKE' | 'DISLIKE' | 'NONE';

export type ChatItemType = 'event' | 'outcoming' | 'incoming' | null;

export interface ChatItem {
  message?: Message;
  date?: string;
}

export interface MessageInfo {
  id: string;
  text: string;
}

export interface Message extends AbstractAuditing {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  reference?: Message;

  isDeleted: boolean;
  isEvent: boolean;

  statuses: MessageStatus[];
  reactions: MessageReaction[];
}

export interface MessageStatus {
  chatId: string;
  messageId: string;
  userId: string;
  type: MessageStatusType;
  date: number;
}

export interface MessageReaction {
  chatId: string;
  messageId: string;
  userId: string;
  type: MessageReactionType;
  date: number;
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

export const buildEventMessage = (chatId: string, userId: string, type: EventMessageType, ids: string[]): Message => {
  const params: EventMessageParams = {type, ids};
  return {
    id: ID_STUB,
    chatId,
    userId,
    text: JSON.stringify(params),
    reference: undefined,
    isDeleted: false,
    isEvent: true,
    statuses: [],
    reactions: [],
    createdAt: DateUtils.getNowTime(),
  };
};

export const buildMessageReaction = (
  chatId: string,
  messageId: string,
  userId: string,
  type: MessageReactionType,
): MessageReaction => ({
  chatId,
  messageId,
  userId,
  type,
  date: DateUtils.getNowTime(),
});

export const buildMessageStatus = (
  chatId: string,
  messageId: string,
  userId: string,
  type: MessageStatusType,
): MessageStatus => ({
  chatId,
  messageId,
  userId,
  type,
  date: DateUtils.getNowTime(),
});

export const buildMessageFromDTO = (dto: MessageDTO, chatId: string, userId: string): Message => ({
  ...dto,
  id: '',
  chatId,
  userId,
  isDeleted: false,
  isEvent: false,
  statuses: [],
  reactions: [],
  createdAt: DateUtils.getNowTime(),
  createdBy: userId,
});
