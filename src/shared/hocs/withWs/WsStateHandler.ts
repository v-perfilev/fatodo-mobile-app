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
import {InfoActions} from '../../../store/info/infoActions';
import {ItemActions} from '../../../store/item/itemActions';

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
        return this.handleItemUpdateEvent;
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
      case 'CONTACT_DECLINE':
        return this.handleContactDeclineEvent;
      case 'CONTACT_DELETE':
        return this.handleContactDeleteEvent;
      // COMMENT
      case 'COMMENT_CREATE':
        return this.handleCommentCreateEvent;
      case 'COMMENT_UPDATE':
        return this.handleCommentUpdateEvent;
      case 'COMMENT_DELETE':
        return this.handleCommentDeleteEvent;
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

  private handleItemUpdateArchivedEvent = (msg: WsEvent<Item>): void => {
    const item = msg.payload;
    this.dispatch(GroupsActions.updateItemArchived(item));
    this.dispatch(GroupActions.updateItem(item));
  };

  private handleItemDeleteEvent = (msg: WsEvent<Item>): void => {
    const item = msg.payload;
    this.dispatch(GroupsActions.removeItem(item));
    this.dispatch(GroupActions.removeItem(item.id));
    this.dispatch(ItemActions.removeItem(item.id));
  };

  private handleItemGroupCreateEvent = (msg: WsEvent<Group>): void => {
    const group = msg.payload;
    this.dispatch(GroupsActions.addGroup(group));
  };

  private handleItemGroupUpdateEvent = (msg: WsEvent<Group>): void => {
    const group = msg.payload;
    this.dispatch(GroupsActions.updateGroup(group));
    this.dispatch(GroupActions.setGroup(group));
    this.dispatch(ItemActions.setGroup(group));
  };

  private handleItemGroupDeleteEvent = (msg: WsEvent<Group>): void => {
    const groupId = msg.payload.id;
    this.dispatch(GroupsActions.removeGroup(groupId));
    this.dispatch(GroupActions.removeGroup(groupId));
    this.dispatch(ItemActions.removeGroup(groupId));
  };

  private handleItemMemberAddEvent = (msg: WsEvent<GroupMember[]>): void => {
    const members = msg.payload;
    const memberIds = members.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const groupId = msg.payload[0].groupId;
      this.dispatch(GroupsActions.fetchGroupThunk(groupId));
    } else {
      this.dispatch(GroupsActions.addMembers(members));
      this.dispatch(GroupActions.addMembers(members));
    }
  };

  private handleItemMemberDeleteEvent = (msg: WsEvent<GroupMember[]>): void => {
    const members = msg.payload;
    const memberIds = members.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const groupId = msg.payload[0].groupId;
      this.dispatch(GroupsActions.removeGroup(groupId));
      this.dispatch(GroupActions.removeGroup(groupId));
      this.dispatch(ItemActions.removeGroup(groupId));
    } else {
      this.dispatch(GroupsActions.removeMembers(members));
      this.dispatch(GroupActions.removeMembers(members));
    }
  };

  private handleItemMemberLeaveEvent = (msg: WsEvent<GroupMember>): void => {
    const member = msg.payload;
    if (member.userId === this.account.id) {
      const groupId = msg.payload.groupId;
      this.dispatch(GroupsActions.removeGroup(groupId));
      this.dispatch(GroupActions.removeGroup(groupId));
      this.dispatch(ItemActions.removeGroup(groupId));
    } else {
      this.dispatch(GroupsActions.removeMembers([member]));
      this.dispatch(GroupActions.removeMembers([member]));
    }
  };

  private handleItemMemberRoleEvent = (msg: WsEvent<GroupMember>): void => {
    const member = msg.payload;
    this.dispatch(GroupsActions.updateMembers([member]));
    this.dispatch(GroupActions.updateMembers([member]));
  };

  /*
  CHAT
   */

  private handleChatCreateEvent = (msg: WsEvent<Chat>): void => {
    this.dispatch(ChatsActions.addChat(msg.payload));
  };

  private handleChatUpdateEvent = (msg: WsEvent<Chat>): void => {
    this.dispatch(ChatsActions.updateChat(msg.payload));
    this.dispatch(ChatActions.updateChat(msg.payload));
  };

  private handleChatMemberAddEvent = (msg: WsEvent<ChatMember[]>): void => {
    const members = msg.payload;
    const memberIds = members.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const chatId = msg.payload[0].chatId;
      this.dispatch(ChatsActions.fetchChatThunk(chatId));
    } else {
      this.dispatch(ChatsActions.addMembers(msg.payload));
      this.dispatch(ChatActions.addMembers(msg.payload));
    }
  };

  private handleChatMemberDeleteEvent = (msg: WsEvent<ChatMember[]>): void => {
    const memberIds = msg.payload.map((m) => m.userId);
    if (memberIds.includes(this.account.id)) {
      const chatId = msg.payload[0].chatId;
      this.dispatch(ChatsActions.removeChat(chatId));
      this.dispatch(ChatActions.removeChat(chatId));
    } else {
      this.dispatch(ChatsActions.removeMembers(msg.payload));
      this.dispatch(ChatActions.removeMembers(msg.payload));
    }
  };

  private handleChatMemberLeaveEvent = (msg: WsEvent<ChatMember>): void => {
    if (msg.payload.userId === this.account.id) {
      const chatId = msg.payload.chatId;
      this.dispatch(ChatsActions.removeChat(chatId));
      this.dispatch(ChatActions.removeChat(chatId));
    } else {
      this.dispatch(ChatsActions.removeMembers([msg.payload]));
      this.dispatch(ChatActions.removeMembers([msg.payload]));
    }
  };

  private handleChatMessageCreateEvent = (msg: WsEvent<Message>): void => {
    this.dispatch(ChatsActions.setChatLastMessageAction(msg.payload));
    this.dispatch(ChatsActions.increaseMessageCountAction(msg.payload));
    this.dispatch(ChatActions.addMessageThunk(msg.payload));
  };

  private handleChatMessageUpdateEvent = (msg: WsEvent<Message>): void => {
    this.dispatch(ChatsActions.updateChatLastMessageAction(msg.payload));
    this.dispatch(ChatActions.updateMessage(msg.payload, this.account));
  };

  private handleChatReactionEvent = (msg: WsEvent<MessageReaction>): void => {
    this.dispatch(ChatActions.setMessageReaction(msg.payload, this.account));
  };

  private handleChatStatusEvent = (msg: WsEvent<MessageStatus>): void => {
    this.dispatch(ChatActions.setMessageStatus(msg.payload, this.account));
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

  private handleContactDeclineEvent = (msg: WsEvent<ContactRequest>): void => {
    this.dispatch(ContactsActions.removeIncomingRequest(msg.payload.requesterId));
    this.dispatch(ContactsActions.removeOutcomingRequest(msg.payload.recipientId));
  };

  private handleContactDeleteEvent = (msg: WsEvent<ContactRelation>): void => {
    const userId = [msg.payload.firstUserId, msg.payload.secondUserId].find((userId) => userId !== this.account.id);
    userId && this.dispatch(ContactsActions.removeRelation(userId));
  };

  /*
  COMMENT
   */

  private handleCommentCreateEvent = (msg: WsEvent<Comment>): void => {
    this.dispatch(CommentsActions.addComment(msg.payload));
    this.dispatch(InfoActions.incrementCommentCount(msg.payload.targetId));
    if (msg.payload.userId !== this.account.id) {
      this.dispatch(InfoActions.incrementUnreadCommentCount(msg.payload.targetId));
    }
  };

  private handleCommentUpdateEvent = (msg: WsEvent<Comment>): void => {
    this.dispatch(CommentsActions.updateComment(msg.payload));
  };

  private handleCommentDeleteEvent = (msg: WsEvent<Comment>): void => {
    this.dispatch(CommentsActions.deleteComment(msg.payload));
  };

  private handleCommentReactionEvent = (msg: WsEvent<CommentReaction>): void => {
    this.dispatch(CommentsActions.updateCommentReaction(msg.payload));
  };
}
