import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Chat} from '../../models/Chat';
import ChatsActions from '../chats/chatsActions';
import {MessageDTO} from '../../models/dto/MessageDTO';
import SnackActions from '../snack/snackActions';

enum TYPES {
  FETCH_MESSAGES = 'chat/fetchMessages',
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
}

class ChatThunks {
  static fetchMessages = createAsyncThunk(
    TYPES.FETCH_MESSAGES,
    async ({chatId, offset}: {chatId: string; offset: number}) => {
      const result = await ChatService.getAllMessagesByChatIdPageable(chatId, offset);
      return result.data;
    },
  );

  static markAsRead = createAsyncThunk(TYPES.MARK_AS_READ, async (messageId: string) => {
    const result = await ChatService.markMessageAsRead(messageId);
    return result.data;
  });

  static noReaction = createAsyncThunk(TYPES.NO_REACTION, async (messageId: string) => {
    const result = await ChatService.noneMessageReaction(messageId);
    return result.data;
  });

  static likeReaction = createAsyncThunk(TYPES.LIKE_REACTION, async (messageId: string) => {
    const result = await ChatService.likeMessageReaction(messageId);
    return result.data;
  });

  static dislikeReaction = createAsyncThunk(TYPES.DISLIKE_REACTION, async (messageId: string) => {
    const result = await ChatService.dislikeMessageReaction(messageId);
    return result.data;
  });

  static renameChat = createAsyncThunk(
    TYPES.RENAME_CHAT,
    async ({chatId, title}: {chatId: string; title: string}, thunkAPI) => {
      const result = await ChatService.renameChat(chatId, title);
      thunkAPI.dispatch(ChatsActions.updateChat(result.data));
      thunkAPI.dispatch(SnackActions.handleCode('chat.renamed', 'info'));
    },
  );

  static clearChat = createAsyncThunk(TYPES.CLEAR_CHAT, async (chatId: string, thunkAPI) => {
    // TODO handler
    await ChatService.clearChat(chatId);
    thunkAPI.dispatch(SnackActions.handleCode('chat.cleared', 'info'));
  });

  static leaveChat = createAsyncThunk(TYPES.LEAVE_CHAT, async (chatId: string, thunkAPI) => {
    // TODO handler
    await ChatService.leaveChat(chatId);
    thunkAPI.dispatch(SnackActions.handleCode('chat.left', 'info'));
  });

  static deleteChat = createAsyncThunk(TYPES.DELETE_CHAT, async (chatId: string, thunkAPI) => {
    // TODO handler
    await ChatService.leaveChat(chatId);
    thunkAPI.dispatch(SnackActions.handleCode('chat.deleted', 'info'));
  });

  static addChatMembers = createAsyncThunk(
    TYPES.ADD_CHAT_MEMBERS,
    async ({chat, userIds}: {chat: Chat; userIds: string[]}, thunkAPI) => {
      chat.members = ArrayUtils.addValuesToEnd(chat.members, userIds);
      await ChatService.addUsersToChat(chat.id, userIds);
      thunkAPI.dispatch(SnackActions.handleCode('chat.edited', 'info'));
      thunkAPI.dispatch(ChatsActions.updateChat(chat));
    },
  );

  static removeChatMember = createAsyncThunk(
    TYPES.REMOVE_CHAT_MEMBER,
    async ({chat, userId}: {chat: Chat; userId: string}, thunkAPI) => {
      chat.members = ArrayUtils.deleteValueById(chat.members, userId);
      await ChatService.removeUsersFromChat(chat.id, [userId]);
      thunkAPI.dispatch(SnackActions.handleCode('chat.edited', 'info'));
      thunkAPI.dispatch(ChatsActions.updateChat(chat));
    },
  );

  static sendMessage = createAsyncThunk(
    TYPES.SEND_MESSAGE,
    async ({chatId, dto}: {chatId: string; dto: MessageDTO}) => {
      // TODO handler
      const result = await ChatService.sendIndirectMessage(chatId, dto);
      return result.data;
    },
  );

  static editMessage = createAsyncThunk(
    TYPES.EDIT_MESSAGE,
    async ({messageId, dto}: {messageId: string; dto: MessageDTO}, thunkAPI) => {
      // TODO handler
      const result = await ChatService.editMessage(messageId, dto);
      thunkAPI.dispatch(SnackActions.handleCode('chat.messageEdited', 'info'));
      return result.data;
    },
  );
}

export default ChatThunks;
