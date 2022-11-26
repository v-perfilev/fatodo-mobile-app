import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatsState} from './chatsType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {Chat, ChatMember} from '../../models/Chat';
import {ChatsActions} from './chatsActions';
import {Message} from '../../models/Message';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';
import {StoreUtils} from '../../shared/utils/StoreUtils';

const initialState: ChatsState = {
  chats: [],
  filteredChats: [],
  unreadCount: 0,
  unreadMap: [],
  allLoaded: false,
  chatsInitialized: false,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    reset: (state: ChatsState) => {
      Object.assign(state, initialState);
    },

    resetChats: (state: ChatsState) => {
      state.chats = [];
    },

    setChats: (state: ChatsState, action: PayloadAction<Chat[]>) => {
      state.chats = filterChats([...action.payload, ...state.chats]);
    },

    setFilteredChats: (state: ChatsState, action: PayloadAction<Chat[]>) => {
      state.filteredChats = filterChats(action.payload);
    },

    removeChat: (state: ChatsState, action: PayloadAction<string>) => {
      state.chats = ArrayUtils.deleteValueById(state.chats, action.payload);
    },

    setLastMessage: (state: ChatsState, action: PayloadAction<Message>) => {
      const message = action.payload;
      const chat = state.chats.find((chat) => chat.id === message.chatId);
      if (chat) {
        chat.lastMessage = message;
        state.chats = filterChats([chat, ...state.chats]);
      }
    },

    setMembers: (state: ChatsState, action: PayloadAction<ChatMember[]>) => {
      const members = action.payload;
      const chatId = members.length > 0 && members[0].chatId;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.members = filterMembers([...members, ...chat.members]);
        state.chats = filterChats([chat, ...state.chats]);
      }
    },

    removeMembers: (state: ChatsState, action: PayloadAction<ChatMember[]>) => {
      const members = action.payload;
      const memberIds = members.map((m) => m.userId);
      const chatId = members.length > 0 && members[0].chatId;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.members = chat.members.filter((m) => !memberIds.includes(m.userId));
        state.chats = filterChats([chat, ...state.chats]);
      }
    },

    setUnreadMessageMap: (state: ChatsState, action: PayloadAction<[string, string[]][]>) => {
      state.unreadMap = action.payload;
      state.unreadCount = calculateUnreadCount(state.unreadMap);
    },

    addUnreadMessage: (state: ChatsState, action: PayloadAction<Message>) => {
      state.unreadMap = addUnreadMessage(state.unreadMap, action.payload);
      state.unreadCount = calculateUnreadCount(state.unreadMap);
    },

    removeUnreadMessage: (state: ChatsState, action: PayloadAction<Message>) => {
      state.unreadMap = removeUnreadMessage(state.unreadMap, action.payload);
      state.unreadCount = calculateUnreadCount(state.unreadMap);
    },

    removeUnreadChat: (state: ChatsState, action: PayloadAction<string>) => {
      state.unreadMap = removeUnreadChat(state.unreadMap, action.payload);
      state.unreadCount = calculateUnreadCount(state.unreadMap);
    },

    calculateAllLoaded: (state: ChatsState, action: PayloadAction<number>) => {
      state.allLoaded = state.chats.length === action.payload;
    },

    setChatsInitialized: (state: ChatsState, action: PayloadAction<boolean>) => {
      state.chatsInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchChat
    */
    builder.addCase(ChatsActions.fetchChatThunk.fulfilled, (state, action) => {
      chatsSlice.caseReducers.setChats(state, {...action, payload: [action.payload]});
    });

    /*
    fetchChats
    */
    builder.addCase(ChatsActions.fetchChatsThunk.fulfilled, (state, action) => {
      chatsSlice.caseReducers.setChats(state, {...action, payload: action.payload.data});
      chatsSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
      chatsSlice.caseReducers.setChatsInitialized(state, {...action, payload: true});
    });

    /*
    refreshChats
    */
    builder.addCase(ChatsActions.refreshChatsThunk.fulfilled, (state, action) => {
      chatsSlice.caseReducers.resetChats(state);
      chatsSlice.caseReducers.setChats(state, {...action, payload: action.payload.data});
      chatsSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    fetchFilteredChats
    */
    builder.addCase(ChatsActions.fetchFilteredChatsThunk.fulfilled, (state, action) => {
      chatsSlice.caseReducers.setFilteredChats(state, action);
    });

    /*
    fetchUnreadMessagesMap
    */
    builder.addCase(ChatsActions.fetchUnreadMessagesMapThunk.fulfilled, (state, action) => {
      chatsSlice.caseReducers.setUnreadMessageMap(state, action);
    });
  },
});

const filterChats = (chats: Chat[]): Chat[] => {
  return chats
    .filter(FilterUtils.uniqueByIdFilter)
    .sort((a, b) => ComparatorUtils.createdAtComparator(a.lastMessage, b.lastMessage));
};

const filterMembers = (members: ChatMember[]): ChatMember[] => {
  return members.filter(FilterUtils.uniqueByUserIdFilter);
};

const addUnreadMessage = (unreadMap: [string, string[]][], message: Message): [string, string[]][] => {
  let messageIds: string[] = StoreUtils.getValue(unreadMap, message.chatId, []);
  messageIds = [message.id, ...messageIds].filter(FilterUtils.uniqueFilter);
  return StoreUtils.setValue(unreadMap, message.chatId, messageIds);
};

const removeUnreadMessage = (unreadMap: [string, string[]][], message: Message): [string, string[]][] => {
  let messageIds: string[] = StoreUtils.getValue(unreadMap, message.chatId, []);
  messageIds = messageIds.filter((m) => m !== message.id);
  return StoreUtils.setValue(unreadMap, message.chatId, messageIds);
};

const removeUnreadChat = (unreadMap: [string, string[]][], chatId: string): [string, string[]][] => {
  return StoreUtils.deleteValue(unreadMap, chatId);
};

const calculateUnreadCount = (unreadMap: [string, string[]][]): number => {
  return unreadMap.map((entry) => entry[1]).reduce((a, b) => a + b.length, 0);
};

export default chatsSlice;
