import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';
import {Item} from '../../../models/Item';
import Notifications from '../../push/notifications';
import {PushNotificationData} from '../../../models/PushNotification';
import {TFunction} from 'react-i18next';
import {Group, GroupMember} from '../../../models/Group';
import UserService from '../../../services/UserService';
import {Chat} from '../../../models/Chat';
import {Message, MessageReaction} from '../../../models/Message';
import {ContactRequest} from '../../../models/Contact';
import {Comment, CommentReaction} from '../../../models/Comment';
import ItemService from '../../../services/ItemService';
import {CalendarReminder} from '../../../models/Reminder';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsPushHandler {
  private readonly dispatch: AppDispatch;
  private readonly t: TFunction;

  constructor(dispatch: AppDispatch, t: TFunction) {
    this.dispatch = dispatch;
    this.t = t;
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
      case 'ITEM_GROUP_CREATE':
        return this.handleItemGroupCreateEvent;
      case 'ITEM_MEMBER_ADD':
        return this.handleItemMemberAddEvent;
      // CHAT
      case 'CHAT_CREATE':
        return this.handleChatCreateEvent;
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
    const title = this.t('item.create');
    const body = msg.payload.title;
    const data: PushNotificationData = {itemId: msg.payload.id};
    Notifications.showLocal(title, body, data, 'item');
  };

  private handleItemGroupCreateEvent = (msg: WsEvent<Group>): void => {
    const title = this.t('item.createGroup');
    const body = msg.payload.title;
    const data: PushNotificationData = {groupId: msg.payload.id};
    Notifications.showLocal(title, body, data, 'item');
  };

  private handleItemMemberAddEvent = (msg: WsEvent<GroupMember[]>): void => {
    const userIds = msg.payload.map((m) => m.userId);
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('item.addMembers');
      const body = response.data.map((u) => u.username).join(', ');
      const data: PushNotificationData = {groupId: msg.payload[0].groupId};
      Notifications.showLocal(title, body, data, 'item');
    });
  };

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<Chat>): void => {
    const title = this.t('chat.create');
    const body = msg.payload.title;
    const data: PushNotificationData = {chatId: msg.payload.id};
    Notifications.showLocal(title, body, data, 'chat');
  };

  private handleChatMessageCreateEvent = (msg: WsEvent<Message>): void => {
    const userIds = [msg.payload.userId];
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('chat.createMessage') + ': ' + response.data.map((u) => u.username).join(', ');
      const body = msg.payload.text;
      const data: PushNotificationData = {chatId: msg.payload.chatId};
      Notifications.showLocal(title, body, data, 'chat');
    });
  };

  private handleChatReactionIncomingEvent = (msg: WsEvent<MessageReaction>): void => {
    const userIds = [msg.payload.userId];
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('chat.chatReaction');
      const body = response.data.map((u) => u.username).join(', ');
      const data: PushNotificationData = {chatId: msg.payload.chatId};
      Notifications.showLocal(title, body, data, 'chat');
    });
  };

  /*
  CONTACT
   */

  private handleContactRequestIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    const userIds = [msg.payload.requesterId];
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('contact.request');
      const body = response.data.map((u) => u.username).join(', ');
      const data: PushNotificationData = {userId: msg.payload.requesterId};
      Notifications.showLocal(title, body, data, 'contact');
    });
  };

  private handleContactAcceptIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    const userIds = [msg.payload.recipientId];
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('contact.requestAccept');
      const body = response.data.map((u) => u.username).join(', ');
      const data: PushNotificationData = {userId: msg.payload.recipientId};
      Notifications.showLocal(title, body, data, 'contact');
    });
  };

  /*
  COMMENT
   */

  private handleCommentCreateEvent = (msg: WsEvent<Comment>): void => {
    const userIds = [msg.payload.userId];
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('comment.create') + ': ' + response.data.map((u) => u.username).join(', ');
      const body = msg.payload.text;
      const data: PushNotificationData = {commentTargetId: msg.payload.targetId};
      Notifications.showLocal(title, body, data, 'comment');
    });
  };

  private handleCommentReactionIncomingEvent = (msg: WsEvent<CommentReaction>): void => {
    const userIds = [msg.payload.userId];
    UserService.getAllByIds(userIds).then((response) => {
      const title = this.t('comment.createReaction');
      const body = response.data.map((u) => u.username).join(', ');
      const data: PushNotificationData = {commentTargetId: msg.payload.targetId};
      Notifications.showLocal(title, body, data, 'comment');
    });
  };

  /*
  REMINDER
   */

  private handleReminderEvent = (msg: WsEvent<CalendarReminder>): void => {
    const itemIds = [msg.payload.targetId];
    ItemService.getItemInfoByIds(itemIds).then((response) => {
      const title = this.t('reminder');
      const body = response.data.map((i) => i.title).join(', ');
      const data: PushNotificationData = {itemId: msg.payload.targetId};
      Notifications.showLocal(title, body, data, 'reminder');
    });
  };
}
