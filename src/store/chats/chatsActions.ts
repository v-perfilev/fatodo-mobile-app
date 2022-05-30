import {AppDispatch} from '../store';
import {Chat} from '../../models/Chat';
import chatsSlice from './chatsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {SnackActions} from '../snack/snackActions';
import {MessageDTO} from '../../models/dto/MessageDTO';

export class ChatsActions {
  static addChat = (chat: Chat) => (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addChat(chat));
  };

  static updateChat = (chat: Chat) => (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.updateChat(chat));
  };

  static removeChat = (chat: Chat) => (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.removeChat(chat));
  };
}

enum TYPES {
  FETCH_CHATS = 'chats/fetchChats',
  FETCH_FILTERED_CHATS = 'chats/fetchFilteredChats',
  CREATE_DIRECT_CHAT = 'chats/createDirectChat',
  CREATE_INDIRECT_CHAT = 'chats/createIndirectChat',
  SEND_DIRECT_MESSAGE = 'chats/sendDirectMessage',
}

export class ChatsThunks {
  static fetchChats = createAsyncThunk(TYPES.FETCH_CHATS, async (offset: number) => {
    const result = await ChatService.getAllChatsPageable(offset);
    return result.data;
  });

  static fetchFilteredChats = createAsyncThunk(TYPES.FETCH_FILTERED_CHATS, async (filter: string) => {
    const result = await ChatService.getFilteredChats(filter);
    return result.data;
  });

  static createDirectChat = createAsyncThunk(TYPES.CREATE_DIRECT_CHAT, async (userId: string, thunkAPI) => {
    const result = await ChatService.createDirectChat(userId);
    thunkAPI.dispatch(ChatsActions.addChat(result.data));
    thunkAPI.dispatch(SnackActions.handleCode('chat.created', 'info'));
  });

  static createIndirectChat = createAsyncThunk(TYPES.CREATE_INDIRECT_CHAT, async (userIds: string[], thunkAPI) => {
    const result = await ChatService.createIndirectChat(userIds);
    thunkAPI.dispatch(ChatsActions.addChat(result.data));
    thunkAPI.dispatch(SnackActions.handleCode('chat.created', 'info'));
  });

  static sendDirectMessage = createAsyncThunk(
    TYPES.SEND_DIRECT_MESSAGE,
    async ({userId, dto}: {userId: string; dto: MessageDTO}) => {
      await ChatService.sendDirectMessage(userId, dto);
      // TODO handle if presented
    },
  );
}
