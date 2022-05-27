import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';

enum TYPES {
  FETCH_CHATS = 'chats/fetchChats',
  FETCH_FILTERED_CHATS = 'chats/fetchFilteredChats',
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
}

export default ChatsThunks;
