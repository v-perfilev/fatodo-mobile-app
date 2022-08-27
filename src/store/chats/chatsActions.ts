import chatsSlice from './chatsSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import snackSlice from '../snack/snackSlice';
import {AppDispatch, RootState} from '../store';
import {Chat, ChatMember} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {InfoActions} from '../info/infoActions';
import {Message} from '../../models/Message';

const PREFIX = 'chats/';

export class ChatsActions {
  static addChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addChat(chat));
  };

  static updateChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.updateChat(chat));
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

  static fetchChatsThunk = createAsyncThunk(PREFIX + 'fetchChats', async (offset: number, thunkAPI) => {
    const result = await ChatService.getAllChatsPageable(offset);
    const chats = result.data.data;
    const chatUserIds = ChatUtils.extractUserIds(chats);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
    return result.data;
  });

  static refreshChatsThunk = createAsyncThunk(PREFIX + 'refreshChats', async (_, thunkAPI) => {
    thunkAPI.dispatch(ChatsActions.fetchChatsThunk(0));
  });

  static fetchFilteredChatsThunk = createAsyncThunk(PREFIX + 'fetchFilteredChats', async (filter: string, thunkAPI) => {
    const result = await ChatService.getFilteredChats(filter);
    const chatUserIds = ChatUtils.extractUserIds(result.data);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
    return result.data;
  });

  static createDirectChatThunk = createAsyncThunk(PREFIX + 'createDirectChat', async (userId: string, thunkAPI) => {
    const result = await ChatService.createDirectChat(userId);
    thunkAPI.dispatch(chatsSlice.actions.createChat({chat: result.data, userIds: [userId]}));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.created', variant: 'info'}));
  });

  static createIndirectChatThunk = createAsyncThunk(
    PREFIX + 'createIndirectChat',
    async (userIds: string[], thunkAPI) => {
      const result = await ChatService.createIndirectChat(userIds);
      thunkAPI.dispatch(chatsSlice.actions.createChat({chat: result.data, userIds}));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.created', variant: 'info'}));
    },
  );

  static sendDirectMessageThunk = createAsyncThunk(
    PREFIX + 'sendDirectMessage',
    async ({userId, dto}: {userId: string; dto: MessageDTO}, thunkAPI) => {
      await ChatService.sendDirectMessage(userId, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastDirectMessage);
    },
  );

  static fetchUnreadMessagesMapThunk = createAsyncThunk(PREFIX + 'fetchUnreadMessagesMap', async () => {
    const response = await ChatService.getUnreadMessagesMap();
    return response.data;
  });

  static addChatLastMessageAction = createAsyncThunk(
    PREFIX + 'addChatLastMessageAction',
    async (message: Message, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      let chat = state.chats.chats.find((chat) => chat.id === message.chatId);
      if (chat) {
        chat.lastMessage = message;
      } else {
        const response = await ChatService.getChatById(message.chatId);
        chat = response.data;
      }
      thunkAPI.dispatch(chatsSlice.actions.addChat(chat));
    },
  );

  static updateChatLastMessageAction = createAsyncThunk(
    PREFIX + 'updateChatLastMessageAction',
    async (message: Message, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      let chat = state.chats.chats.find((chat) => chat.id === message.chatId);
      if (chat && chat.lastMessage.id === message.id) {
        chat.lastMessage = message;
        thunkAPI.dispatch(chatsSlice.actions.addChat(chat));
      }
    },
  );

  static increaseMessageCounterAction = createAsyncThunk(
    PREFIX + 'increaseMessageCounterAction',
    async (message: Message, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const account = state.auth.account;
      if (!message?.isEvent && message?.userId === account.id) {
        thunkAPI.dispatch(chatsSlice.actions.addUnread(message));
      }
    },
  );
}
