import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsEventHandler {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  public handleMessage = (msg: WsEvent<any>): void => {
    const handlerFunc = this.getHandler(msg.type);
    handlerFunc && handlerFunc(msg);
  };

  private getHandler = (type: WsEventType): HandlerFunc | undefined => {
    switch (type) {
      // DEFAULT
      case 'WELCOME':
        return this.handleDefaultWelcomeEvent;
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
        return this.handleContactRequestIncomingEvent;
      case 'CONTACT_REQUEST_OUTCOMING':
        return this.handleContactRequestOutcomingEvent;
      case 'CONTACT_ACCEPT_INCOMING':
        return this.handleContactAcceptIncomingEvent;
      case 'CONTACT_ACCEPT_OUTCOMING':
        return this.handleContactAcceptOutcomingEvent;
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
  DEFAULT
   */

  private handleDefaultWelcomeEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  ITEM
   */

  private handleItemCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemUpdateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemUpdateStatusEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemUpdateArchivedEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemDeleteEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemGroupCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemGroupUpdateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemGroupDeleteEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemMemberAddEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemMemberDeleteEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemMemberLeaveEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemMemberRoleEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatUpdateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMemberAddEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMemberDeleteEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMemberLeaveEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatReactionIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  CONTACT
   */

  private handleContactRequestIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactRequestOutcomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactAcceptIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactAcceptOutcomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  COMMENT
   */

  private handleCommentCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleCommentReactionIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  REMINDER
   */

  private handleReminderEvent = (msg: WsEvent<unknown>): void => console.log(msg);
}
