import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';

enum TYPES {
  FETCH_CHATS = 'chats/fetchChats',
}

export class ChatsThunks {
  static fetchChats = createAsyncThunk(TYPES.FETCH_CHATS, async (offset: number) => {
    const result = await ChatService.getAllChatsPageable(offset);
    return result.data;
  });
}

export default ChatsThunks;
