import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsPushHandler {
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
  DEFAULT
   */

  private handleDefaultWelcomeEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  ITEM
   */

  private handleItemCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemGroupCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleItemMemberAddEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMessageCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatReactionIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  CONTACT
   */

  private handleContactRequestIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactAcceptIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

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
