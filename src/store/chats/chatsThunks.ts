import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';

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

  static createDirectChat = createAsyncThunk(TYPES.CREATE_DIRECT_CHAT, async (userId: string) => {
    const result = await ChatService.createDirectChat(userId);
    return result.data;
  });

  static createIndirectChat = createAsyncThunk(TYPES.CREATE_INDIRECT_CHAT, async (userIds: string[]) => {
    const result = await ChatService.createIndirectChat(userIds);
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
