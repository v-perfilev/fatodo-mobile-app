import {CommentReactionType} from './Comment';
import {GroupPermission} from './Group';
import {MessageReactionType} from './Message';

export interface Event {
  id: string;

  type: EventType;
  contactEvent?: ContactEvent;
  itemEvent?: ItemEvent;
  commentEvent?: CommentEvent;
  chatEvent?: ChatEvent;
  reminderEvent?: ReminderEvent;

  createdAt: Date;
}

interface ContactEvent {
  firstUserId: number;
  secondUserId: number;
}

interface ItemEvent {
  userId: string;
  groupId: string;
  itemId?: string;
  userIds?: string[];
  role?: GroupPermission;
}

interface CommentEvent {
  userId: string;
  parentId: string;
  targetId: string;
  commentId: string;
  reaction?: CommentReactionType;
}

interface ChatEvent {
  userId: string;
  chatId: string;
  messageId?: string;
  userIds?: string[];
  reaction?: MessageReactionType;
}

interface ReminderEvent {
  groupId: string;
  itemId: string;
}

enum EventType {
  // ACCOUNT
  WELCOME = 'WELCOME',

  // CONTACT
  CONTACT_SEND = 'CONTACT_SEND',
  CONTACT_ACCEPT = 'CONTACT_ACCEPT',

  // ITEM
  ITEM_CREATE = 'ITEM_CREATE',
  ITEM_UPDATE = 'ITEM_UPDATE',
  ITEM_GROUP_CREATE = 'ITEM_GROUP_CREATE',
  ITEM_GROUP_UPDATE = 'ITEM_GROUP_UPDATE',
  ITEM_MEMBER_ADD = 'ITEM_MEMBER_ADD',
  ITEM_MEMBER_DELETE = 'ITEM_MEMBER_DELETE',
  ITEM_MEMBER_LEAVE = 'ITEM_MEMBER_LEAVE',
  ITEM_MEMBER_ROLE = 'ITEM_MEMBER_ROLE',

  // COMMENT
  COMMENT_ADD = 'COMMENT_ADD',
  COMMENT_REACTION = 'COMMENT_REACTION',

  // CHAT
  CHAT_CREATE = 'CHAT_CREATE',
  CHAT_UPDATE = 'CHAT_UPDATE',
  CHAT_MEMBER_ADD = 'CHAT_MEMBER_ADD',
  CHAT_MEMBER_DELETE = 'CHAT_MEMBER_DELETE',
  CHAT_MEMBER_LEAVE = 'CHAT_MEMBER_LEAVE',
  CHAT_REACTION = 'CHAT_REACTION',

  // REMINDER
  REMINDER = 'REMINDER',
}
