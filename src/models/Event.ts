import {CommentReactionType} from './Comment';
import {GroupPermission} from './Group';
import {MessageReactionType} from './Message';

export interface Event {
  id?: string;

  type: EventType;
  date: number;

  contactEvent?: ContactEvent;
  itemEvent?: ItemEvent;
  commentEvent?: CommentEvent;
  chatEvent?: ChatEvent;
  reminderEvent?: ReminderEvent;
}

export interface ContactEvent {
  firstUserId: string;
  secondUserId: string;
}

export interface ItemEvent {
  userId: string;
  groupId: string;
  itemId?: string;
  userIds?: string[];
  role?: GroupPermission;
}

export interface CommentEvent {
  userId: string;
  parentId: string;
  targetId: string;
  commentId: string;
  reaction?: CommentReactionType;
}

export interface ChatEvent {
  userId: string;
  chatId: string;
  messageId?: string;
  userIds?: string[];
  reaction?: MessageReactionType;
}

export interface ReminderEvent {
  groupId: string;
  itemId: string;
}

export enum EventType {
  // ACCOUNT
  WELCOME = 'WELCOME',

  // CONTACT
  CONTACT_REQUEST = 'CONTACT_REQUEST',
  CONTACT_REQUEST_INCOMING = 'CONTACT_REQUEST_INCOMING',
  CONTACT_REQUEST_OUTCOMING = 'CONTACT_REQUEST_OUTCOMING',
  CONTACT_ACCEPT = 'CONTACT_ACCEPT',
  CONTACT_ACCEPT_INCOMING = 'CONTACT_ACCEPT_INCOMING',
  CONTACT_ACCEPT_OUTCOMING = 'CONTACT_ACCEPT_OUTCOMING',

  // ITEM
  ITEM_CREATE = 'ITEM_CREATE',
  ITEM_UPDATE = 'ITEM_UPDATE',
  ITEM_UPDATE_STATUS = 'ITEM_UPDATE_STATUS',
  ITEM_UPDATE_ARCHIVED = 'ITEM_UPDATE_ARCHIVED',
  ITEM_GROUP_CREATE = 'ITEM_GROUP_CREATE',
  ITEM_GROUP_UPDATE = 'ITEM_GROUP_UPDATE',
  ITEM_MEMBER_ADD = 'ITEM_MEMBER_ADD',
  ITEM_MEMBER_DELETE = 'ITEM_MEMBER_DELETE',
  ITEM_MEMBER_LEAVE = 'ITEM_MEMBER_LEAVE',
  ITEM_MEMBER_ROLE = 'ITEM_MEMBER_ROLE',

  // COMMENT
  COMMENT_CREATE = 'COMMENT_CREATE',
  COMMENT_REACTION_INCOMING = 'COMMENT_REACTION_INCOMING',

  // CHAT
  CHAT_CREATE = 'CHAT_CREATE',
  CHAT_UPDATE = 'CHAT_UPDATE',
  CHAT_MEMBER_ADD = 'CHAT_MEMBER_ADD',
  CHAT_MEMBER_DELETE = 'CHAT_MEMBER_DELETE',
  CHAT_MEMBER_LEAVE = 'CHAT_MEMBER_LEAVE',
  CHAT_MESSAGE_CREATE = 'CHAT_MESSAGE_CREATE',
  CHAT_REACTION_INCOMING = 'CHAT_REACTION_INCOMING',

  // REMINDER
  REMINDER = 'REMINDER',
}
