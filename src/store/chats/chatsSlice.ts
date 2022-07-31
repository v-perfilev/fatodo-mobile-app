import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatsState} from './chatsType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {buildDirectChat, Chat} from '../../models/Chat';
import {ChatsThunks} from './chatsActions';
import {buildEventMessage, EventMessageType, Message} from '../../models/Message';
import {ChatUtils} from '../../shared/utils/ChatUtils';

interface ChatDirectMessagePayload {
  message: Message;
  secondUserId: string;
}

interface ChatCreatePayload {
  chat: Chat;
  userIds: string[];
}

const initialState: ChatsState = {
  chats: [],
  filteredChats: [],
  unreadCount: 0,
  unreadMap: [],
  loading: false,
  moreLoading: false,
  allLoaded: false,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChatWs: (state: ChatsState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      const chatInList = ArrayUtils.findValueWithId(state.chats, chat);
      let chats = chatInList
        ? ArrayUtils.updateValueWithId(state.chats, chat)
        : ChatUtils.filterChats([chat, ...state.chats]);
      return {...state, chats};
    },

    updateChatWs: (state: ChatsState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      const chats = ArrayUtils.updateValueWithId(state.chats, chat);
      return {...state, chats};
    },

    addChat: (state: ChatsState, action: PayloadAction<ChatCreatePayload>) => {
      const chat = action.payload.chat;
      const userIds = action.payload.userIds;
      const eventType = chat.isDirect ? EventMessageType.CREATE_DIRECT_CHAT : EventMessageType.CREATE_CHAT;
      const lastMessage = buildEventMessage(chat.createdBy, eventType, userIds);
      const newChat = {...chat, lastMessage} as Chat;
      const chats = ChatUtils.filterChats([newChat, ...state.chats]);
      return {...state, chats};
    },

    updateChat: (state: ChatsState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      const chats = ArrayUtils.updateValueWithId(state.chats, chat);
      return {...state, chats};
    },

    removeChat: (state: ChatsState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      const chats = ArrayUtils.deleteValueWithId(state.chats, chat);
      return {...state, chats};
    },

    updateLastMessage: (state: ChatsState, action: PayloadAction<Message>) => {
      const message = action.payload;
      const chat = state.chats.find((chat) => chat.id === message.chatId);
      let chats = state.chats;
      if (chat) {
        const updatedChat = {...chat, lastMessage: message};
        chats = ArrayUtils.updateValueWithId(state.chats, updatedChat);
      }
      return {...state, chats};
    },

    updateLastDirectMessage: (state: ChatsState, action: PayloadAction<ChatDirectMessagePayload>) => {
      const message = action.payload.message;
      const secondUserId = action.payload.secondUserId;
      const chat = state.chats.find((chat) => chat.id === message.chatId);
      let chats;
      if (chat) {
        const updatedChat = {...chat, lastMessage: message};
        chats = ArrayUtils.updateValueWithId(state.chats, updatedChat);
      } else {
        const updatedChat = buildDirectChat(message, secondUserId);
        chats = ChatUtils.filterChats([updatedChat, ...state.chats]);
      }
      return {...state, chats};
    },

    clearChat: (state: ChatsState, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      let chats = state.chats;
      if (chat) {
        const message = buildEventMessage(undefined, EventMessageType.CLEAR_CHAT, undefined);
        const updatedChat = {...chat, lastMessage: message};
        chats = ArrayUtils.updateValueWithId(state.chats, updatedChat);
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
      const newChats = action.payload.data;
      const count = action.payload.count;
      const chats = ChatUtils.filterChats([...state.chats, ...newChats]);
      const loading = false;
      const moreLoading = false;
      const allLoaded = chats.length === count;
      return {...state, chats, loading, moreLoading, allLoaded};
    });
    builder.addCase(ChatsThunks.fetchChats.rejected, (state: ChatsState) => {
      const loading = false;
      const moreLoading = false;
      return {...state, loading, moreLoading};
    });

    /*
    refreshChats
    */
    builder.addCase(ChatsThunks.refreshChats.pending, (state: ChatsState) => {
      const chats = [] as Chat[];
      const loading = true;
      const moreLoading = false;
      return {...state, chats, loading, moreLoading};
    });

    /*
    fetchFilteredChats
    */
    builder.addCase(ChatsThunks.fetchFilteredChats.pending, (state: ChatsState) => {
      const filteredChats = [] as Chat[];
      return {...state, filteredChats};
    });
    builder.addCase(ChatsThunks.fetchFilteredChats.fulfilled, (state: ChatsState, action) => {
      const chats = action.payload;
      const filteredChats = ChatUtils.filterChats(chats);
      return {...state, filteredChats};
    });
    builder.addCase(ChatsThunks.fetchFilteredChats.rejected, (state: ChatsState) => {
      const filteredChats = [] as Chat[];
      return {...state, filteredChats};
    });

    /*
    fetchUnreadMessagesMap
    */
    builder.addCase(ChatsThunks.fetchUnreadMessagesMap.fulfilled, (state: ChatsState, action) => {
      const unreadMessagesMap = action.payload;
      const unreadCount = Array.from(unreadMessagesMap.values()).reduce((a, b) => a + b.length, 0);
      const unreadMap = [...unreadMessagesMap];
      return {...state, unreadCount, unreadMap};
    });
  },
});

export default chatsSlice;
