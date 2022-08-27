export interface WsEvent<T> {
  userIds: string[];
  type: WsEventType;
  payload?: T;
  userId?: string;
  date: number;
}

export type WsEventType =
  | WsDefaultEventType
  | WsItemEventType
  | WsChatEventType
  | WsContactEventType
  | WsCommentEventType
  | WsReminderEventType;

export type WsDefaultEventType = 'WELCOME';

export type WsItemEventType =
  | 'ITEM_GROUP_CREATE'
  | 'ITEM_GROUP_UPDATE'
  | 'ITEM_GROUP_DELETE'
  | 'ITEM_CREATE'
  | 'ITEM_UPDATE'
  | 'ITEM_UPDATE_STATUS'
  | 'ITEM_UPDATE_ARCHIVED'
  | 'ITEM_DELETE'
  | 'ITEM_MEMBER_ADD'
  | 'ITEM_MEMBER_DELETE'
  | 'ITEM_MEMBER_LEAVE'
  | 'ITEM_MEMBER_ROLE';

export type WsChatEventType =
  | 'CHAT_CREATE'
  | 'CHAT_UPDATE'
  | 'CHAT_MEMBER_ADD'
  | 'CHAT_MEMBER_DELETE'
  | 'CHAT_MEMBER_LEAVE'
  | 'CHAT_MESSAGE_CREATE'
  | 'CHAT_MESSAGE_UPDATE'
  | 'CHAT_REACTION'
  | 'CHAT_REACTION_INCOMING'
  | 'CHAT_STATUS';

export type WsContactEventType =
  | 'CONTACT_REQUEST_INCOMING'
  | 'CONTACT_REQUEST_OUTCOMING'
  | 'CONTACT_ACCEPT_INCOMING'
  | 'CONTACT_ACCEPT_OUTCOMING'
  | 'CONTACT_DELETE_INCOMING'
  | 'CONTACT_DELETE_OUTCOMING'
  | 'CONTACT_DELETE';

export type WsCommentEventType = 'COMMENT_CREATE' | 'COMMENT_UPDATE' | 'COMMENT_REACTION' | 'COMMENT_REACTION_INCOMING';

export type WsReminderEventType = 'REMINDER';
