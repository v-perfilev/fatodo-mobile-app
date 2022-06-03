import {createSlice} from '@reduxjs/toolkit';
import {ChatsState} from './chatsType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Chat} from '../../models/Chat';
import {ChatsThunks} from './chatsActions';
import {Message} from '../../models/Message';

const initialState: ChatsState = {
  totalUnreadMessageCount: 0,
  unreadMessageCountMap: [],
  chats: [],
  filteredChats: [],
  loading: false,
  moreLoading: false,
  allLoaded: false,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state: ChatsState, action) => {
      const chat = action.payload as Chat;
      const chats = ArrayUtils.addValueToStart(state.chats, chat).filter(ArrayUtils.uniqueByIdFilter);
      return {...state, chats};
    },

    updateChat: (state: ChatsState, action) => {
      const chat = action.payload as Chat;
      const chats = ArrayUtils.updateValueWithId(state.chats, chat);
      return {...state, chats};
    },

    removeChat: (state: ChatsState, action) => {
      const chat = action.payload as Chat;
      const chats = ArrayUtils.deleteValueWithId(state.chats, chat);
      return {...state, chats};
    },

    updateLastMessage: (state: ChatsState, action) => {
      const message = action.payload as Message;
      const chat = state.chats.find((chat) => chat.id === message.chatId);
      let chats = state.chats;
      if (chat) {
        chat.lastMessage = message;
        chats = ArrayUtils.updateValueWithId(state.chats, chat);
      }
      return {...state, chats};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchChats
    */
    builder.addCase(ChatsThunks.fetchChats.pending, (state: ChatsState, action) => {
      const initialLoading = action.meta.arg === 0;
      const loading = initialLoading;
      const moreLoading = !initialLoading;
      return {...state, loading, moreLoading};
    });
    builder.addCase(ChatsThunks.fetchChats.fulfilled, (state: ChatsState, action) => {
      const newChats = action.payload;
      const chats = ArrayUtils.addValuesToEnd(state.chats, newChats).filter(ArrayUtils.uniqueByIdFilter);
      const loading = false;
      const moreLoading = false;
      const allLoaded = newChats.length === 0;
      return {...state, chats, loading, moreLoading, allLoaded};
    });
    builder.addCase(ChatsThunks.fetchChats.rejected, (state: ChatsState) => {
      const loading = false;
      const moreLoading = false;
      return {...state, loading, moreLoading};
    });

    /*
    fetchFilteredChats
    */
    builder.addCase(ChatsThunks.fetchFilteredChats.pending, (state: ChatsState) => {
      const filteredChats = [] as Chat[];
      return {...state, filteredChats};
    });
    builder.addCase(ChatsThunks.fetchFilteredChats.fulfilled, (state: ChatsState, action) => {
      const newChats = action.payload;
      const filteredChats = newChats.filter(ArrayUtils.uniqueByIdFilter);
      return {...state, filteredChats};
    });
    builder.addCase(ChatsThunks.fetchFilteredChats.rejected, (state: ChatsState) => {
      const filteredChats = [] as Chat[];
      return {...state, filteredChats};
    });
  },
});

export default chatsSlice;
