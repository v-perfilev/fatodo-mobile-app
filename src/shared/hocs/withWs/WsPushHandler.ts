import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';
import {Item} from '../../../models/Item';
import {GroupMember} from '../../../models/Group';
import {Chat, ChatMember} from '../../../models/Chat';
import {Message, MessageReaction} from '../../../models/Message';
import {ContactRequest} from '../../../models/Contact';
import {Comment, CommentReaction} from '../../../models/Comment';
import {ReminderInfo} from '../../../models/Reminder';
import {ChatEvent, CommentEvent, ContactEvent, Event, EventType, ItemEvent, ReminderEvent} from '../../../models/Event';
import {EventsActions} from '../../../store/events/eventsActions';
import {UserAccount} from '../../../models/User';
import {NotificationActions} from '../../../store/notification/notificationActions';
import {navigationRef} from '../withNavigationContainer';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsPushHandler {
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
      case 'ITEM_MEMBER_ADD':
        return this.handleItemMemberAddEvent;
      // CHAT
      case 'CHAT_CREATE':
        return this.handleChatCreateEvent;
      case 'CHAT_MEMBER_ADD':
        return this.handleChatMemberAddEvent;
      case 'CHAT_MESSAGE_CREATE':
        return this.handleChatMessageCreateEvent;
      case 'CHAT_REACTION_INCOMING':
        return this.handleChatReactionIncomingEvent;
      // CONTACT
      case 'CONTACT_REQUEST_INCOMING':
        return this.handleContactRequestIncomingEvent;
      case 'CONTACT_ACCEPT_INCOMING':
        return this.handleContactAcceptIncomingEvent;
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

  private handleItemCreateEvent = (msg: WsEvent<Item>): void => {
    const userId = msg.userId;
    const groupId = msg.payload.groupId;
    const itemId = msg.payload.id;
    const userIds = [] as string[];
    const itemEvent: ItemEvent = {userId, groupId, itemId, userIds};
    const event: Event = {type: EventType.ITEM_CREATE, itemEvent, date: msg.date};
    const isOwnEvent = this.account.id === userId;
    !isOwnEvent && this.dispatch(EventsActions.addEvent(event, isOwnEvent));
  };

  private handleItemMemberAddEvent = (msg: WsEvent<GroupMember[]>): void => {
    const userId = msg.userId;
    const groupId = msg.payload[0].groupId;
    const userIds = msg.payload.map((m) => m.userId);
    const itemEvent: ItemEvent = {userId, groupId, userIds};
    const event: Event = {type: EventType.ITEM_MEMBER_ADD, itemEvent, date: msg.date};
    const isOwnEvent = this.account.id === userId;
    !isOwnEvent && this.dispatch(EventsActions.addEvent(event, isOwnEvent));
  };

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<Chat>): void => {
    const userId = msg.userId;
    const chatId = msg.payload.id;
    const userIds = msg.payload.members.map((m) => m.userId).filter((id) => id !== userId);
    const chatEvent: ChatEvent = {userId, chatId, userIds};
    const event: Event = {type: EventType.CHAT_CREATE, chatEvent, date: msg.date};
    const isOwnEvent = this.account.id === userId;
    !isOwnEvent && this.dispatch(NotificationActions.add(event));
  };

  private handleChatMemberAddEvent = (msg: WsEvent<ChatMember[]>): void => {
    const userId = msg.userId;
    const chatId = msg.payload[0].chatId;
    const userIds = msg.payload.map((m) => m.userId);
    const chatEvent: ChatEvent = {userId, chatId, userIds};
    const event: Event = {type: EventType.CHAT_MEMBER_ADD, chatEvent, date: msg.date};
    const isOwnEvent = this.account.id === userId;
    !isOwnEvent && this.dispatch(NotificationActions.add(event));
  };

  private handleChatMessageCreateEvent = (msg: WsEvent<Message>): void => {
    const userId = msg.userId;
    const chatId = msg.payload.chatId;
    const messageId = msg.payload.id;
    const chatEvent: ChatEvent = {userId, chatId, messageId};
    const event: Event = {type: EventType.CHAT_MESSAGE_CREATE, chatEvent, date: msg.date};
    const isOwnEvent = this.account.id === userId;
    const shouldDisplay = this.shouldDisplayChatNotification(chatId);
    !isOwnEvent && shouldDisplay && this.dispatch(NotificationActions.add(event));
  };

  private handleChatReactionIncomingEvent = (msg: WsEvent<MessageReaction>): void => {
    const userId = msg.userId;
    const chatId = msg.payload.chatId;
    const messageId = msg.payload.messageId;
    const reaction = msg.payload.type;
    const chatEvent: ChatEvent = {userId, chatId, messageId, reaction};
    const event: Event = {type: EventType.CHAT_REACTION_INCOMING, chatEvent, date: msg.date};
    reaction !== 'NONE' && this.dispatch(NotificationActions.add(event));
  };

  /*
  CONTACT
   */

  private handleContactRequestIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    const firstUserId = msg.payload.requesterId;
    const secondUserId = msg.payload.recipientId;
    const contactEvent: ContactEvent = {firstUserId, secondUserId};
    const event: Event = {type: EventType.CONTACT_REQUEST_INCOMING, contactEvent, date: msg.date};
    this.dispatch(NotificationActions.add(event));
  };

  private handleContactAcceptIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    const firstUserId = msg.payload.recipientId;
    const secondUserId = msg.payload.requesterId;
    const contactEvent: ContactEvent = {firstUserId, secondUserId};
    const event: Event = {type: EventType.CONTACT_ACCEPT_INCOMING, contactEvent, date: msg.date};
    this.dispatch(NotificationActions.add(event));
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
    const isOwnEvent = this.account.id === userId;
    const shouldDisplay = this.shouldDisplayCommentNotification(targetId);
    !isOwnEvent && shouldDisplay && this.dispatch(NotificationActions.add(event));
  };

  private handleCommentReactionIncomingEvent = (msg: WsEvent<CommentReaction>): void => {
    const parentId = msg.payload.parentId;
    const targetId = msg.payload.targetId;
    const commentId = msg.payload.commentId;
    const reaction = msg.payload.type;
    const commentEvent: CommentEvent = {userId: msg.userId, parentId, targetId, commentId, reaction};
    const event: Event = {type: EventType.COMMENT_REACTION_INCOMING, commentEvent, date: msg.date};
    reaction !== 'NONE' && this.dispatch(NotificationActions.add(event));
  };

  /*
  REMINDER
   */

  private handleReminderEvent = (msg: WsEvent<ReminderInfo>): void => {
    const reminderEvent: ReminderEvent = {groupId: msg.payload.groupId, itemId: msg.payload.itemId};
    const event: Event = {type: EventType.REMINDER, reminderEvent, date: msg.date};
    this.dispatch(NotificationActions.add(event));
  };

  /*
  DISPLAY CHECKS
   */

  private shouldDisplayChatNotification = (chatId: string): boolean => {
    const routeName = navigationRef.getCurrentRoute().name;
    const routeParams: any = navigationRef.getCurrentRoute().params;
    return routeName === 'ChatView' && (routeParams?.chat?.id === chatId || routeParams?.chatId === chatId);
  };

  private shouldDisplayCommentNotification = (targetId: string): boolean => {
    const routeName = navigationRef.getCurrentRoute().name;
    const routeParams: any = navigationRef.getCurrentRoute().params;
    return routeName === 'CommentList' && routeParams?.targetId === targetId;
  };
}
