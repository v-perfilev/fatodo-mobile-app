import chatsSlice from './chatsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import snackSlice from '../snack/snackSlice';
import {AppDispatch, RootState} from '../store';
import {Chat, ChatMember} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {InfoThunks} from '../info/infoActions';
import {UserAccount} from '../../models/User';
import {Message} from '../../models/Message';

export class ChatsActions {
  static addChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addChat(chat));
  };

  static updateChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.updateChat(chat));
  };

  static addChatLastMessage = (chat: Chat, account: UserAccount) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addChat(chat));
    const message = chat.lastMessage;
    if (!message?.isEvent && message?.userId === account.id) {
      dispatch(chatsSlice.actions.addUnread(message));
    }
  };

  static removeChat = (chatId: string) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.removeChat(chatId));
  };

  static addMembers = (members: ChatMember[]) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addMembers(members));
  };

  static deleteMembers = (members: ChatMember[]) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.deleteMembers(members));
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
  ADD_LAST_MESSAGE = 'chats/addLastMessage',
  UPDATE_LAST_MESSAGE = 'chats/updateLastMessage',
  INCREASE_MESSAGE_COUNTER = 'chats/increaseMessageCounter',
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
    thunkAPI.dispatch(chatsSlice.actions.createChat({chat: result.data, userIds: [userId]}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.created', variant: 'info'}));
  });

  static createIndirectChat = createAsyncThunk(TYPES.CREATE_INDIRECT_CHAT, async (userIds: string[], thunkAPI) => {
    const result = await ChatService.createIndirectChat(userIds);
    thunkAPI.dispatch(chatsSlice.actions.createChat({chat: result.data, userIds}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.created', variant: 'info'}));
  });

  static sendDirectMessage = createAsyncThunk(
    TYPES.SEND_DIRECT_MESSAGE,
    async ({userId, dto}: {userId: string; dto: MessageDTO}, thunkAPI) => {
      await ChatService.sendDirectMessage(userId, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastDirectMessage);
    },
  );

  static fetchUnreadMessagesMap = createAsyncThunk(TYPES.FETCH_UNREAD_MESSAGES_MAP, async () => {
    const response = await ChatService.getUnreadMessagesMap();
    return response.data;
  });

  static addChatLastMessage = createAsyncThunk(TYPES.ADD_LAST_MESSAGE, async (message: Message, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let chat = state.chats.chats.find((chat) => chat.id === message.chatId);
    if (chat) {
      chat.lastMessage = message;
    } else {
      const response = await ChatService.getChatById(message.chatId);
      chat = response.data;
    }
    thunkAPI.dispatch(chatsSlice.actions.addChat(chat));
  });

  static updateChatLastMessage = createAsyncThunk(TYPES.UPDATE_LAST_MESSAGE, async (message: Message, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let chat = state.chats.chats.find((chat) => chat.id === message.chatId);
    if (chat && chat.lastMessage.id === message.id) {
      chat.lastMessage = message;
      thunkAPI.dispatch(chatsSlice.actions.addChat(chat));
    }
  });

  static increaseMessageCounter = createAsyncThunk(
    TYPES.INCREASE_MESSAGE_COUNTER,
    async (message: Message, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const account = state.auth.account;
      if (!message?.isEvent && message?.userId === account.id) {
        thunkAPI.dispatch(chatsSlice.actions.addUnread(message));
      }
    },
  );
}
