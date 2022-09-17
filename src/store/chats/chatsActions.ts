import chatsSlice from './chatsSlice';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {Chat, ChatMember} from '../../models/Chat';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {InfoActions} from '../info/infoActions';
import {Message} from '../../models/Message';
import {SnackActions} from '../snack/snackActions';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PageableList} from '../../models/PageableList';

const PREFIX = 'chats/';

export class ChatsActions {
  static addChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.setChats([chat]));
  };

  static updateChat = (chat: Chat) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.setChats([chat]));
  };

  static addMembers = (members: ChatMember[]) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.addMembers(members));
  };

  static deleteMembers = (members: ChatMember[]) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.deleteMembers(members));
  };

  static removeChat = (chatId: string) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.removeChat(chatId));
  };

  static removeUnreadChat = (chatId: string) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.removeUnreadChat(chatId));
  };

  static removeUnreadMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatsSlice.actions.removeUnreadMessage(message));
  };

  static fetchChatsThunk = createAsyncThunk<PageableList<Chat>, number, AsyncThunkConfig>(
    PREFIX + 'fetchChats',
    async (offset, thunkAPI) => {
      const result = await ChatService.getAllChatsPageable(offset);
      const chats = result.data.data;
      const chatUserIds = ChatUtils.extractUserIds(chats);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
      return result.data;
    },
  );

  static refreshChatsThunk = createAsyncThunk<void, void, AsyncThunkConfig>(
    PREFIX + 'refreshChats',
    async (_, thunkAPI) => {
      thunkAPI.dispatch(ChatsActions.fetchChatsThunk(0));
    },
  );

  static fetchFilteredChatsThunk = createAsyncThunk<Chat[], string, AsyncThunkConfig>(
    PREFIX + 'fetchFilteredChats',
    async (filter, thunkAPI) => {
      const result = await ChatService.getFilteredChats(filter);
      const chatUserIds = ChatUtils.extractUserIds(result.data);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
      return result.data;
    },
  );

  static createDirectChatThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'createDirectChat',
    async (userId, thunkAPI) => {
      const result = await ChatService.createDirectChat(userId);
      thunkAPI.dispatch(chatsSlice.actions.setChats([result.data]));
      thunkAPI.dispatch(SnackActions.handleCode('chat.created', 'info'));
    },
  );

  static createIndirectChatThunk = createAsyncThunk<void, string[], AsyncThunkConfig>(
    PREFIX + 'createIndirectChat',
    async (userIds, thunkAPI) => {
      const result = await ChatService.createIndirectChat(userIds);
      thunkAPI.dispatch(chatsSlice.actions.setChats([result.data]));
      thunkAPI.dispatch(SnackActions.handleCode('chat.created', 'info'));
    },
  );

  static sendDirectMessageThunk = createAsyncThunk<void, {userId: string; dto: MessageDTO}, AsyncThunkConfig>(
    PREFIX + 'sendDirectMessage',
    async ({userId, dto}, thunkAPI) => {
      const result = await ChatService.sendDirectMessage(userId, dto);
      thunkAPI.dispatch(ChatsActions.setChatLastMessageAction(result.data));
    },
  );

  static fetchUnreadMessagesMapThunk = createAsyncThunk<[string, string[]][], void, AsyncThunkConfig>(
    PREFIX + 'fetchUnreadMessagesMap',
    async () => {
      const response = await ChatService.getUnreadMessagesMap();
      return response.data;
    },
  );

  static setChatLastMessageAction = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'addChatLastMessageAction',
    async (message, thunkAPI) => {
      let chat = thunkAPI.getState().chats.chats.find((chat) => chat.id === message.chatId);
      if (chat) {
        chat.lastMessage = message;
      } else {
        const response = await ChatService.getChatById(message.chatId);
        chat = response.data;
      }
      thunkAPI.dispatch(chatsSlice.actions.setChats([chat]));
    },
  );

  static updateChatLastMessageAction = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'addChatLastMessageAction',
    async (message, thunkAPI) => {
      let chat = thunkAPI.getState().chats.chats.find((chat) => chat.id === message.chatId);
      if (chat && chat.lastMessage?.id === message.id) {
        chat.lastMessage = message;
        thunkAPI.dispatch(chatsSlice.actions.setChats([chat]));
      }
    },
  );

  static increaseMessageCounterAction = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'increaseMessageCounterAction',
    async (message: Message, thunkAPI) => {
      const account = thunkAPI.getState().auth.account;
      if (!message?.isEvent && message?.userId === account.id) {
        thunkAPI.dispatch(chatsSlice.actions.addUnreadMessage(message));
      }
    },
  );
}
