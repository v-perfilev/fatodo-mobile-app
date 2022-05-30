import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import SnackActions from '../snack/snackActions';

enum TYPES {
  FETCH_CHATS = 'chats/fetchChats',
  FETCH_FILTERED_CHATS = 'chats/fetchFilteredChats',
  CREATE_DIRECT_CHAT = 'chats/createDirectChat',
  CREATE_INDIRECT_CHAT = 'chats/createIndirectChat',
  SEND_DIRECT_MESSAGE = 'chats/sendDirectMessage',
}

class ChatsThunks {
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
    thunkAPI.dispatch(SnackActions.handleCode('chat.created', 'info'));
    return result.data;
  });

  static createIndirectChat = createAsyncThunk(TYPES.CREATE_INDIRECT_CHAT, async (userIds: string[], thunkAPI) => {
    const result = await ChatService.createIndirectChat(userIds);
    thunkAPI.dispatch(SnackActions.handleCode('chat.created', 'info'));
    return result.data;
  });

  static sendDirectMessage = createAsyncThunk(
    TYPES.SEND_DIRECT_MESSAGE,
    async ({userId, dto}: {userId: string; dto: MessageDTO}) => {
      const result = await ChatService.sendDirectMessage(userId, dto);
      return result.data;
    },
  );
}

export default ChatsThunks;
