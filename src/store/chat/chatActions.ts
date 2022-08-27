import chatSlice from './chatSlice';
import {Chat} from '../../models/Chat';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {MessageDTO} from '../../models/dto/MessageDTO';
import {UserAccount} from '../../models/User';
import {buildMessageFromDTO, Message, MessageReaction, MessageStatus} from '../../models/Message';
import snackSlice from '../snack/snackSlice';
import chatsSlice from '../chats/chatsSlice';
import {AppDispatch, RootState} from '../store';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {MessageUtils} from '../../shared/utils/MessageUtils';
import {InfoThunks} from '../info/infoActions';

interface ChatMessageReadPayload {
  chatId: string;
  messageId: string;
  account: UserAccount;
}

export class ChatActions {
  static addMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.addMessage(message));
  };

  static updateMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateMessage(message));
  };

  static updateMessageReactions = (messageReaction: MessageReaction) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateMessageReactions(messageReaction));
  };

  static updateMessageStatuses = (messageStatus: MessageStatus) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateMessageStatuses(messageStatus));
  };
}

enum TYPES {
  SELECT_CHAT = 'chat/selectChat',
  FETCH_CHAT = 'chat/fetchChat',
  FETCH_MESSAGES = 'chat/fetchMessages',
  REFRESH_MESSAGES = 'chat/refreshMessages',
  MARK_AS_READ = 'chat/markAsRead',
  NO_REACTION = 'chat/noReaction',
  LIKE_REACTION = 'chat/likeReaction',
  DISLIKE_REACTION = 'chat/dislikeReaction',
  RENAME_CHAT = 'chat/renameChat',
  CLEAR_CHAT = 'chat/clearChat',
  LEAVE_CHAT = 'chat/leaveChat',
  DELETE_CHAT = 'chat/deleteChat',
  ADD_CHAT_MEMBERS = 'chat/addChatMembers',
  REMOVE_CHAT_MEMBER = 'chat/removeChatMember',
  SEND_MESSAGE = 'chat/sendMessage',
  EDIT_MESSAGE = 'chat/editMessage',
  DELETE_MESSAGE = 'chat/deleteMessage',
}

export class ChatThunks {
  static selectChat = createAsyncThunk(TYPES.SELECT_CHAT, async (chat: Chat, thunkAPI) => {
    await thunkAPI.dispatch(chatSlice.actions.selectChat(chat));
    await thunkAPI.dispatch(ChatThunks.fetchMessages({chatId: chat.id, offset: 0}));
  });

  static fetchChat = createAsyncThunk(TYPES.FETCH_CHAT, async (chatId: string, thunkAPI) => {
    const result = await ChatService.getChatById(chatId);
    const chatUserIds = ChatUtils.extractUserIds([result.data]);
    thunkAPI.dispatch(InfoThunks.handleUserIds(chatUserIds));
    await thunkAPI.dispatch(ChatThunks.fetchMessages({chatId: result.data.id, offset: 0}));
    return result.data;
  });

  static fetchMessages = createAsyncThunk(
    TYPES.FETCH_MESSAGES,
    async ({chatId, offset}: {chatId: string; offset: number}, thunkAPI) => {
      const result = await ChatService.getAllMessagesByChatIdPageable(chatId, offset);
      const messages = result.data.data;
      const messageUserIds = MessageUtils.extractUserIds(messages);
      thunkAPI.dispatch(InfoThunks.handleUserIds(messageUserIds));
      return result.data;
    },
  );

  static refreshMessages = createAsyncThunk(TYPES.REFRESH_MESSAGES, async (chatId: string, thunkAPI) => {
    thunkAPI.dispatch(ChatThunks.fetchMessages({chatId, offset: 0}));
  });

  static markMessageAsRead = createAsyncThunk(
    TYPES.MARK_AS_READ,
    async ({chatId, messageId, account}: ChatMessageReadPayload, thunkAPI) => {
      ChatService.markMessageAsRead(messageId);
      thunkAPI.dispatch(chatsSlice.actions.removeUnread({chatId, messageId}));
      thunkAPI.dispatch(chatSlice.actions.markMessageAsRead({messageId, account}));
    },
  );

  static noReaction = createAsyncThunk(
    TYPES.NO_REACTION,
    async ({message, account}: {message: Message; account: UserAccount}, thunkAPI) => {
      ChatService.noneMessageReaction(message.id);
      thunkAPI.dispatch(chatSlice.actions.deleteMessageReaction({message, account}));
    },
  );

  static likeReaction = createAsyncThunk(
    TYPES.LIKE_REACTION,
    async ({message, account}: {message: Message; account: UserAccount}, thunkAPI) => {
      ChatService.likeMessageReaction(message.id);
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({message, reactionType: 'LIKE', account}));
    },
  );

  static dislikeReaction = createAsyncThunk(
    TYPES.DISLIKE_REACTION,
    async ({message, account}: {message: Message; account: UserAccount}, thunkAPI) => {
      ChatService.dislikeMessageReaction(message.id);
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({message, reactionType: 'DISLIKE', account}));
    },
  );

  static renameChat = createAsyncThunk(
    TYPES.RENAME_CHAT,
    async ({chat, title}: {chat: Chat; title: string}, thunkAPI) => {
      const result = await ChatService.renameChat(chat.id, title);
      thunkAPI.dispatch(chatsSlice.actions.updateChat(result.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.renamed', variant: 'info'}));
    },
  );

  static clearChat = createAsyncThunk(TYPES.CLEAR_CHAT, async (chat: Chat, thunkAPI) => {
    await ChatService.clearChat(chat.id);
    thunkAPI.dispatch(chatsSlice.actions.clearChat(chat.id));
    thunkAPI.dispatch(chatSlice.actions.clearChat());
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.cleared', variant: 'info'}));
  });

  static leaveChat = createAsyncThunk(TYPES.LEAVE_CHAT, async (chat: Chat, thunkAPI) => {
    await ChatService.leaveChat(chat.id);
    thunkAPI.dispatch(chatsSlice.actions.removeChat(chat.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.left', variant: 'info'}));
  });

  static deleteChat = createAsyncThunk(TYPES.DELETE_CHAT, async (chat: Chat, thunkAPI) => {
    await ChatService.deleteChat(chat.id);
    thunkAPI.dispatch(chatsSlice.actions.removeChat(chat.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.deleted', variant: 'info'}));
  });

  static addChatMembers = createAsyncThunk(
    TYPES.ADD_CHAT_MEMBERS,
    async ({chat, userIds}: {chat: Chat; userIds: string[]}, thunkAPI) => {
      const newMembers = userIds.map((userId) => ({chatId: chat.id, userId}));
      const updatedMembers = [...chat.members, ...newMembers];
      const updatedChat = {...chat, members: updatedMembers};
      await ChatService.addUsersToChat(chat.id, userIds);
      thunkAPI.dispatch(chatsSlice.actions.updateChat(updatedChat));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.edited', variant: 'info'}));
    },
  );

  static removeChatMember = createAsyncThunk(
    TYPES.REMOVE_CHAT_MEMBER,
    async ({chat, userId}: {chat: Chat; userId: string}, thunkAPI) => {
      const updatedMembers = ArrayUtils.deleteValue(chat.members, userId);
      const updatedChat = {...chat, members: updatedMembers};
      await ChatService.removeUsersFromChat(chat.id, [userId]);
      thunkAPI.dispatch(chatsSlice.actions.updateChat(updatedChat));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.edited', variant: 'info'}));
    },
  );

  static sendMessage = createAsyncThunk(
    TYPES.SEND_MESSAGE,
    async ({chatId, dto}: {chatId: string; dto: MessageDTO}, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.account.id;
      const message = buildMessageFromDTO(dto, chatId, userId);
      thunkAPI.dispatch(chatSlice.actions.addMessage(message));
      const result = await ChatService.sendIndirectMessage(chatId, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastMessage(result.data));
    },
  );

  static editMessage = createAsyncThunk(
    TYPES.EDIT_MESSAGE,
    async ({message, dto}: {message: Message; dto: MessageDTO}, thunkAPI) => {
      const result = await ChatService.editMessage(message.id, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastMessage(result.data));
      thunkAPI.dispatch(chatSlice.actions.updateMessage(result.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.messageEdited', variant: 'info'}));
    },
  );

  static deleteMessage = createAsyncThunk(TYPES.DELETE_MESSAGE, async (message: Message, thunkAPI) => {
    ChatService.deleteMessage(message.id);
    const updatedMessage = {...message, isDeleted: true} as Message;
    thunkAPI.dispatch(chatsSlice.actions.updateLastMessage(updatedMessage));
    thunkAPI.dispatch(chatSlice.actions.updateMessage(updatedMessage));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.messageDeleted', variant: 'info'}));
  });
}
