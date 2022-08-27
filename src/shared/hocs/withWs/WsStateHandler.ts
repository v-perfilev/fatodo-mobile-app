import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsStateHandler {
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
      case 'CHAT_MESSAGE_CREATE':
        return this.handleChatMessageCreateEvent;
      case 'CHAT_MESSAGE_UPDATE':
        return this.handleChatMessageUpdateEvent;
      case 'CHAT_REACTION':
        return this.handleChatReactionEvent;
      case 'CHAT_STATUS':
        return this.handleChatStatusEvent;
      // CONTACT
      case 'CONTACT_REQUEST_INCOMING':
        return this.handleContactRequestIncomingEvent;
      case 'CONTACT_REQUEST_OUTCOMING':
        return this.handleContactRequestOutcomingEvent;
      case 'CONTACT_ACCEPT_INCOMING':
        return this.handleContactAcceptIncomingEvent;
      case 'CONTACT_ACCEPT_OUTCOMING':
        return this.handleContactAcceptOutcomingEvent;
      case 'CONTACT_DELETE_INCOMING':
        return this.handleContactDeleteIncomingEvent;
      case 'CONTACT_DELETE_OUTCOMING':
        return this.handleContactDeleteOutcomingEvent;
      case 'CONTACT_DELETE':
        return this.handleContactDeleteEvent;
      // COMMENT
      case 'COMMENT_CREATE':
        return this.handleCommentCreateEvent;
      case 'COMMENT_UPDATE':
        return this.handleCommentUpdateEvent;
      case 'COMMENT_REACTION':
        return this.handleCommentReactionEvent;
      // FALLBACK
      default:
        return undefined;
    }
  };

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatUpdateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMemberAddEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMemberDeleteEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMemberLeaveEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMessageCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatMessageUpdateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatReactionEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleChatStatusEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  CONTACT
   */

  private handleContactRequestIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactRequestOutcomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactAcceptIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactAcceptOutcomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactDeleteIncomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactDeleteOutcomingEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleContactDeleteEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  /*
  COMMENT
   */

  private handleCommentCreateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleCommentUpdateEvent = (msg: WsEvent<unknown>): void => console.log(msg);

  private handleCommentReactionEvent = (msg: WsEvent<unknown>): void => console.log(msg);
}
