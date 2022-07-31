import chatsSlice from './chatsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import snackSlice from '../snack/snackSlice';
import {AppDispatch} from '../store';
import {Chat} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {InfoThunks} from '../info/infoActions';

export class ChatsActions {
  static addChatWs = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addChatWs(chat));
  };

  static updateChatWs = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.updateChatWs(chat));
  };
}

enum TYPES {
  FETCH_CHATS = 'chats/fetchChats',
  REFRESH_CHATS = 'chats/refreshChats',
  FETCH_FILTERED_CHATS = 'chats/fetchFilteredChats',
  CREATE_DIRECT_CHAT = 'chats/createDirectChat',
  CREATE_INDIRECT_CHAT = 'chats/createIndirectChat',
  SEND_DIRECT_MESSAGE = 'chats/sendDirectMessage',
  FETCH_UNREAD_MESSAGES_MAP = 'chats/fetchUnreadMessagesMap',
}

export class ChatsThunks {
  static fetchChats = createAsyncThunk(TYPES.FETCH_CHATS, async (offset: number, thunkAPI) => {
    const result = await ChatService.getAllChatsPageable(offset);
    const chats = result.data.data;
    const chatUserIds = ChatUtils.extractUserIds(chats);
    thunkAPI.dispatch(InfoThunks.handleUserIds(chatUserIds));
    return result.data;
  });

  static refreshChats = createAsyncThunk(TYPES.REFRESH_CHATS, async (_, thunkAPI) => {
    thunkAPI.dispatch(ChatsThunks.fetchChats(0));
  });

  static fetchFilteredChats = createAsyncThunk(TYPES.FETCH_FILTERED_CHATS, async (filter: string, thunkAPI) => {
    const result = await ChatService.getFilteredChats(filter);
    const chatUserIds = ChatUtils.extractUserIds(result.data);
    thunkAPI.dispatch(InfoThunks.handleUserIds(chatUserIds));
    return result.data;
  });

  static createDirectChat = createAsyncThunk(TYPES.CREATE_DIRECT_CHAT, async (userId: string, thunkAPI) => {
    const result = await ChatService.createDirectChat(userId);
    thunkAPI.dispatch(chatsSlice.actions.addChat({chat: result.data, userIds: [userId]}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.created', variant: 'info'}));
  });

  static createIndirectChat = createAsyncThunk(TYPES.CREATE_INDIRECT_CHAT, async (userIds: string[], thunkAPI) => {
    const result = await ChatService.createIndirectChat(userIds);
    thunkAPI.dispatch(chatsSlice.actions.addChat({chat: result.data, userIds}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.created', variant: 'info'}));
  });

  static sendDirectMessage = createAsyncThunk(
    TYPES.SEND_DIRECT_MESSAGE,
    async ({userId, dto}: {userId: string; dto: MessageDTO}, thunkAPI) => {
      await ChatService.sendDirectMessage(userId, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastDirectMessage);
    },
  );

  static fetchUnreadMessagesMap = createAsyncThunk(TYPES.FETCH_UNREAD_MESSAGES_MAP, async (_, thunkAPI) => {
    const response = await ChatService.getUnreadMessagesMap();
    return response.data;
  });
}
