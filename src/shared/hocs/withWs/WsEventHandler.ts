import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';
import {ChatEvent, CommentEvent, ContactEvent, Event, EventType, ItemEvent, ReminderEvent} from '../../../models/Event';
import {EventsActions} from '../../../store/events/eventsActions';
import {Item} from '../../../models/Item';
import eventsSlice from '../../../store/events/eventsSlice';
import {Group, GroupMember} from '../../../models/Group';
import {Chat, ChatMember} from '../../../models/Chat';
import {MessageReaction} from '../../../models/Message';
import {ContactRelation, ContactRequest} from '../../../models/Contact';
import {Comment, CommentReaction} from '../../../models/Comment';
import {CalendarReminder} from '../../../models/Reminder';
import {UserAccount} from '../../../models/User';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsEventHandler {
  private readonly dispatch: AppDispatch;
  private readonly account: UserAccount;

  constructor(dispatch: AppDispatch, account: UserAccount) {
    this.dispatch = dispatch;
    this.account = account;
  }

  public handleMessage = (msg: WsEvent<any>): void => {
    const handlerFunc = this.getHandler(msg.type);
    handlerFunc && handlerFunc(msg);
  };

  private getHandler = (type: WsEventType): HandlerFunc | undefined => {
    switch (type) {
      // ITEM
      case 'ITEM_CREATE':
        return this.handleItemCreateEvent;
      case 'ITEM_UPDATE':
        return this.handleItemUpdateEvent;
      case 'ITEM_UPDATE_STATUS':
        return this.handleItemUpdateStatusEvent;
      case 'ITEM_UPDATE_ARCHIVED':
        return this.handleItemUpdateArchivedEvent;
      case 'ITEM_DELETE':
        return this.handleItemDeleteEvent;
      case 'ITEM_GROUP_CREATE':
        return this.handleItemGroupCreateEvent;
      case 'ITEM_GROUP_UPDATE':
        return this.handleItemGroupUpdateEvent;
      case 'ITEM_GROUP_DELETE':
        return this.handleItemGroupDeleteEvent;
      case 'ITEM_MEMBER_ADD':
        return this.handleItemMemberAddEvent;
      case 'ITEM_MEMBER_DELETE':
        return this.handleItemMemberDeleteEvent;
      case 'ITEM_MEMBER_LEAVE':
        return this.handleItemMemberLeaveEvent;
      case 'ITEM_MEMBER_ROLE':
        return this.handleItemMemberRoleEvent;
      // CHAT
      case 'CHAT_CREATE':
        return this.handleChatCreateEvent;
      case 'CHAT_UPDATE':
        return this.handleChatUpdateEvent;
      case 'CHAT_MEMBER_ADD':
        return this.handleChatMemberAddEvent;
      case 'CHAT_MEMBER_DELETE':
        return this.handleChatMemberDeleteEvent;
      case 'CHAT_MEMBER_LEAVE':
        return this.handleChatMemberLeaveEvent;
      case 'CHAT_REACTION_INCOMING':
        return this.handleChatReactionIncomingEvent;
      // CONTACT
      case 'CONTACT_REQUEST_INCOMING':
      case 'CONTACT_REQUEST_OUTCOMING':
        return this.handleContactRequestEvent;
      case 'CONTACT_ACCEPT_INCOMING':
      case 'CONTACT_ACCEPT_OUTCOMING':
        return this.handleContactAcceptEvent;
      case 'CONTACT_DELETE_INCOMING':
      case 'CONTACT_DELETE_OUTCOMING':
        return this.handleContactRequestRemoveEvent;
      case 'CONTACT_DELETE':
        return this.handleContactRelationRemoveEvent;
      // COMMENT
      case 'COMMENT_CREATE':
        return this.handleCommentCreateEvent;
      case 'COMMENT_REACTION_INCOMING':
        return this.handleCommentReactionIncomingEvent;
      // REMINDER
      case 'REMINDER':
        return this.handleReminderEvent;
      // FALLBACK
      default:
        return undefined;
    }
  };

  /*
  ITEM
   */

  private handleItemCreateEvent = (msg: WsEvent<any>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.groupId;
    const itemId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, itemId, userIds};
    const event: Event = {type: EventType.ITEM_CREATE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemUpdateEvent = (msg: WsEvent<Item>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.groupId;
    const itemId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, itemId, userIds};
    const event: Event = {type: EventType.ITEM_UPDATE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemUpdateStatusEvent = (msg: WsEvent<Item>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.groupId;
    const itemId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, itemId, userIds};
    const event: Event = {type: EventType.ITEM_UPDATE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemUpdateArchivedEvent = (msg: WsEvent<Item>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.groupId;
    const itemId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, itemId, userIds};
    const event: Event = {type: EventType.ITEM_UPDATE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemDeleteEvent = (msg: WsEvent<Item>): void => {
    const itemId = msg.payload.id;
    this.dispatch(EventsActions.removeItemEvents(itemId));
  };

  private handleItemGroupCreateEvent = (msg: WsEvent<Group>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, userIds};
    const event: Event = {type: EventType.ITEM_GROUP_CREATE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemGroupUpdateEvent = (msg: WsEvent<Group>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, userIds};
    const event: Event = {type: EventType.ITEM_GROUP_UPDATE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemGroupDeleteEvent = (msg: WsEvent<Group>): void => {
    const groupId = msg.payload.id;
    this.dispatch(eventsSlice.actions.removeGroupEvents(groupId));
    this.dispatch(eventsSlice.actions.removeCommentEvents(groupId));
    this.dispatch(eventsSlice.actions.removeReminderEventsByGroupId(groupId));
  };

  private handleItemMemberAddEvent = (msg: WsEvent<GroupMember[]>): void => {
    const userId = msg.userId;
    const groupId = msg.payload[0].groupId;
    const userIds = msg.payload.map((m) => m.userId);
    const itemEvent: ItemEvent = {userId, groupId, userIds};
    const event: Event = {type: EventType.ITEM_MEMBER_ADD, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleItemMemberDeleteEvent = (msg: WsEvent<GroupMember[]>): void => {
    const memberIds = msg.payload.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const groupId = msg.payload[0].groupId;
      this.dispatch(EventsActions.removeGroupEvents(groupId));
    } else {
      const userId = msg.userId;
      const groupId = msg.payload[0].groupId;
      const userIds = msg.payload.map((m) => m.userId);
      const itemEvent: ItemEvent = {userId, groupId, userIds};
      const event: Event = {type: EventType.ITEM_MEMBER_DELETE, itemEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  private handleItemMemberLeaveEvent = (msg: WsEvent<GroupMember>): void => {
    if (msg.payload.userId === this.account.id) {
      const groupId = msg.payload.groupId;
      this.dispatch(EventsActions.removeGroupEvents(groupId));
    } else {
      const userId = msg.userId;
      const groupId = msg.payload.groupId;
      const userIds = [msg.payload.userId];
      const itemEvent: ItemEvent = {userId, groupId, userIds};
      const event: Event = {type: EventType.ITEM_MEMBER_LEAVE, itemEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  private handleItemMemberRoleEvent = (msg: WsEvent<GroupMember>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.groupId;
    const userIds = [msg.payload.userId];
    const role = msg.payload.permission;
    const itemEvent: ItemEvent = {userId, groupId, userIds, role};
    const event: Event = {type: EventType.ITEM_MEMBER_ROLE, itemEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<Chat>): void => {
    const userId = msg.userId;
    const chatId = msg.payload.id;
    const userIds = msg.payload.members.map((m) => m.userId);
    const chatEvent: ChatEvent = {userId, chatId, userIds};
    const event: Event = {type: EventType.CHAT_CREATE, chatEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleChatUpdateEvent = (msg: WsEvent<Chat>): void => {
    const userId = msg.userId;
    const chatId = msg.payload.id;
    const userIds = [] as string[];
    const chatEvent: ChatEvent = {userId, chatId, userIds};
    const event: Event = {type: EventType.CHAT_UPDATE, chatEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleChatMemberAddEvent = (msg: WsEvent<ChatMember[]>): void => {
    const memberIds = msg.payload.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const chatId = msg.payload[0].chatId;
      this.dispatch(EventsActions.removeChatEvents(chatId));
    } else {
      const userId = msg.userId;
      const chatId = msg.payload[0].chatId;
      const userIds = msg.payload.map((m) => m.userId);
      const chatEvent: ChatEvent = {userId, chatId, userIds};
      const event: Event = {type: EventType.CHAT_MEMBER_ADD, chatEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  private handleChatMemberDeleteEvent = (msg: WsEvent<ChatMember[]>): void => {
    const memberIds = msg.payload.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const chatId = msg.payload[0].chatId;
      this.dispatch(EventsActions.removeChatEvents(chatId));
    } else {
      const userId = msg.userId;
      const chatId = msg.payload[0].chatId;
      const userIds = msg.payload.map((m) => m.userId);
      const chatEvent: ChatEvent = {userId, chatId, userIds};
      const event: Event = {type: EventType.CHAT_MEMBER_DELETE, chatEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  private handleChatMemberLeaveEvent = (msg: WsEvent<ChatMember>): void => {
    if (msg.payload.userId === this.account.id) {
      const chatId = msg.payload.chatId;
      this.dispatch(EventsActions.removeChatEvents(chatId));
    } else {
      const userId = msg.userId;
      const chatId = msg.payload.chatId;
      const userIds = [msg.payload.userId];
      const chatEvent: ChatEvent = {userId, chatId, userIds};
      const event: Event = {type: EventType.CHAT_MEMBER_LEAVE, chatEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  private handleChatReactionIncomingEvent = (msg: WsEvent<MessageReaction>): void => {
    const userId = msg.userId;
    const chatId = msg.payload.chatId;
    const messageId = msg.payload.messageId;
    const reaction = msg.payload.type;
    this.dispatch(EventsActions.removeChatReactionEvents(messageId, msg.userId));
    if (reaction !== 'NONE') {
      const chatEvent: ChatEvent = {userId, chatId, messageId, reaction};
      const event: Event = {type: EventType.CHAT_REACTION, chatEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  /*
  CONTACT
   */

  private handleContactRequestEvent = (msg: WsEvent<ContactRequest>): void => {
    const firstUserId = msg.payload.requesterId;
    const secondUserId = msg.payload.recipientId;
    const contactEvent: ContactEvent = {firstUserId, secondUserId};
    const event: Event = {type: EventType.CONTACT_SEND, contactEvent, date: msg.date};
    this.dispatch(EventsActions.removeContactEvents(msg.payload.requesterId));
    this.dispatch(EventsActions.removeContactEvents(msg.payload.recipientId));
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleContactAcceptEvent = (msg: WsEvent<ContactRequest>): void => {
    const firstUserId = msg.payload.recipientId;
    const secondUserId = msg.payload.requesterId;
    const contactEvent: ContactEvent = {firstUserId, secondUserId};
    const event: Event = {type: EventType.CONTACT_ACCEPT, contactEvent, date: msg.date};
    this.dispatch(EventsActions.removeContactEvents(msg.payload.requesterId));
    this.dispatch(EventsActions.removeContactEvents(msg.payload.recipientId));
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleContactRequestRemoveEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(EventsActions.removeContactEvents(msg.payload.requesterId));
    this.dispatch(EventsActions.removeContactEvents(msg.payload.recipientId));
  };

  private handleContactRelationRemoveEvent = (msg: WsEvent<ContactRelation>): void => {
    this.dispatch(EventsActions.removeContactEvents(msg.payload.firstUserId));
    this.dispatch(EventsActions.removeContactEvents(msg.payload.secondUserId));
  };

  /*
  COMMENT
   */

  private handleCommentCreateEvent = (msg: WsEvent<Comment>): void => {
    const userId = msg.userId;
    const parentId = msg.payload.parentId;
    const targetId = msg.payload.targetId;
    const commentId = msg.payload.id;
    const commentEvent: CommentEvent = {userId, parentId, targetId, commentId};
    const event: Event = {type: EventType.COMMENT_CREATE, commentEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };

  private handleCommentReactionIncomingEvent = (msg: WsEvent<CommentReaction>): void => {
    const parentId = msg.payload.parentId;
    const targetId = msg.payload.targetId;
    const commentId = msg.payload.commentId;
    const reaction = msg.payload.type;
    this.dispatch(EventsActions.removeCommentReactionEvents(commentId, msg.userId));
    if (reaction !== 'NONE') {
      const commentEvent: CommentEvent = {userId: msg.userId, parentId, targetId, commentId, reaction};
      const event: Event = {type: EventType.COMMENT_REACTION, commentEvent, date: msg.date};
      this.dispatch(EventsActions.addEvent(event));
    }
  };

  /*
  REMINDER
   */

  private handleReminderEvent = (msg: WsEvent<CalendarReminder>): void => {
    const reminderEvent: ReminderEvent = {groupId: msg.payload.parentId, itemId: msg.payload.targetId};
    const event: Event = {type: EventType.REMINDER, reminderEvent, date: msg.date};
    this.dispatch(EventsActions.addEvent(event));
  };
}
