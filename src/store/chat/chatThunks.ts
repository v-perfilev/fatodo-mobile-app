import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';

enum TYPES {
  FETCH_CHATS = 'chats/fetchChats',
}

export class ChatThunks {
  static fetchChats = createAsyncThunk(TYPES.FETCH_CHATS, async (offset: number) => {
    await ChatService.getAllChatsPageable(offset);
  });
}

export default ChatThunks;
