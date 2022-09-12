import {AppDispatch} from '../../../store/store';
import {WsEvent, WsEventType} from '../../../models/Ws';
import {Chat, ChatMember} from '../../../models/Chat';
import {Message, MessageReaction, MessageStatus} from '../../../models/Message';
import {ContactRelation, ContactRequest} from '../../../models/Contact';
import {Comment, CommentReaction} from '../../../models/Comment';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {ChatActions} from '../../../store/chat/chatActions';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {UserAccount} from '../../../models/User';
import {Item} from '../../../models/Item';
import {Group, GroupMember} from '../../../models/Group';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {GroupActions} from '../../../store/group/groupActions';

type HandlerFunc = (msg: WsEvent<any>) => void;

export class WsStateHandler {
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
      case 'ITEM_UPDATE_STATUS':
      case 'ITEM_UPDATE_ARCHIVED':
        return this.handleItemUpdateEvent;
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
 ITEM
  */

  private handleItemCreateEvent = (msg: WsEvent<Item>): void => {
    const item = msg.payload;
    this.dispatch(GroupsActions.addItem(item));
    this.dispatch(GroupActions.addItem(item));
  };

  private handleItemUpdateEvent = (msg: WsEvent<Item>): void => {
    const item = msg.payload;
    this.dispatch(GroupsActions.updateItem(item));
    this.dispatch(GroupActions.updateItem(item));
  };

  private handleItemDeleteEvent = (msg: WsEvent<Item>): void => {
    const itemId = msg.payload.id;
    this.dispatch(GroupsActions.removeItem(itemId));
    this.dispatch(GroupActions.removeItem(itemId));
  };

  private handleItemGroupCreateEvent = (msg: WsEvent<Group>): void => {
    const group = msg.payload;
    this.dispatch(GroupsActions.addGroup(group));
  };

  private handleItemGroupUpdateEvent = (msg: WsEvent<Group>): void => {
    const group = msg.payload;
    this.dispatch(GroupsActions.updateGroup(group));
  };

  private handleItemGroupDeleteEvent = (msg: WsEvent<Group>): void => {
    const groupId = msg.payload.id;
    this.dispatch(GroupsActions.removeGroup(groupId));
  };

  private handleItemMemberAddEvent = (msg: WsEvent<GroupMember[]>): void => {
    const groupId = msg.payload[0].groupId;
    const members = msg.payload;
    this.dispatch(GroupsActions.addMembers(groupId, members));
  };

  private handleItemMemberDeleteEvent = (msg: WsEvent<GroupMember[]>): void => {
    const groupId = msg.payload[0].groupId;
    const members = msg.payload;
    const memberIds = members.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      this.dispatch(GroupsActions.removeGroup(groupId));
    } else {
      this.dispatch(GroupsActions.removeMembers(groupId, members));
    }
  };

  private handleItemMemberLeaveEvent = (msg: WsEvent<GroupMember>): void => {
    const groupId = msg.payload.groupId;
    const member = msg.payload;
    if (member.userId === this.account.id) {
      this.dispatch(GroupsActions.removeGroup(groupId));
    } else {
      this.dispatch(GroupsActions.removeMembers(groupId, [member]));
    }
  };

  private handleItemMemberRoleEvent = (msg: WsEvent<GroupMember>): void => {
    const groupId = msg.payload.groupId;
    const member = msg.payload;
    this.dispatch(GroupsActions.updateMembers(groupId, [member]));
  };

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<Chat>): void => {
    this.dispatch(ChatsActions.addChat(msg.payload));
  };

  private handleChatUpdateEvent = (msg: WsEvent<Chat>): void => {
    this.dispatch(ChatsActions.updateChat(msg.payload));
  };

  private handleChatMemberAddEvent = (msg: WsEvent<ChatMember[]>): void => {
    this.dispatch(ChatsActions.addMembers(msg.payload));
  };

  private handleChatMemberDeleteEvent = (msg: WsEvent<ChatMember[]>): void => {
    const memberIds = msg.payload.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const chatId = msg.payload[0].chatId;
      this.dispatch(ChatsActions.removeChat(chatId));
    } else {
      this.dispatch(ChatsActions.deleteMembers(msg.payload));
    }
  };

  private handleChatMemberLeaveEvent = (msg: WsEvent<ChatMember>): void => {
    if (msg.payload.userId === this.account.id) {
      const chatId = msg.payload.chatId;
      this.dispatch(ChatsActions.removeChat(chatId));
    } else {
      this.dispatch(ChatsActions.deleteMembers([msg.payload]));
    }
  };

  private handleChatMessageCreateEvent = (msg: WsEvent<Message>): void => {
    this.dispatch(ChatsActions.addChatLastMessageAction(msg.payload));
    this.dispatch(ChatsActions.increaseMessageCounterAction(msg.payload));
    this.dispatch(ChatActions.addMessage(msg.payload));
  };

  private handleChatMessageUpdateEvent = (msg: WsEvent<Message>): void => {
    this.dispatch(ChatsActions.updateChatLastMessageAction(msg.payload));
    this.dispatch(ChatActions.updateMessage(msg.payload));
  };

  private handleChatReactionEvent = (msg: WsEvent<MessageReaction>): void => {
    this.dispatch(ChatActions.updateMessageReactions(msg.payload));
  };

  private handleChatStatusEvent = (msg: WsEvent<MessageStatus>): void => {
    this.dispatch(ChatActions.updateMessageStatuses(msg.payload));
  };

  /*
  CONTACT
   */

  private handleContactRequestIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.addIncomingRequest(msg.payload.requesterId));
  };

  private handleContactRequestOutcomingEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.addOutcomingRequest(msg.payload.recipientId));
  };

  private handleContactAcceptIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.acceptIncomingRequest(msg.payload.requesterId));
  };

  private handleContactAcceptOutcomingEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.acceptOutcomingRequest(msg.payload.recipientId));
  };

  private handleContactDeleteIncomingEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.removeIncomingRequest(msg.payload.requesterId));
  };

  private handleContactDeleteOutcomingEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.removeOutcomingRequest(msg.payload.recipientId));
  };

  private handleContactDeleteEvent = (msg: WsEvent<ContactRelation>): void => {
    this.dispatch(ContactsActions.removeRelationAction(msg.payload));
  };

  /*
  COMMENT
   */

  private handleCommentCreateEvent = (msg: WsEvent<Comment>): void => {
    this.dispatch(CommentsActions.addCommentAction(msg.payload));
  };

  private handleCommentUpdateEvent = (msg: WsEvent<Comment>): void => {
    this.dispatch(CommentsActions.updateComment(msg.payload));
  };

  private handleCommentReactionEvent = (msg: WsEvent<CommentReaction>): void => {
    this.dispatch(CommentsActions.updateCommentReactions(msg.payload));
  };
}
