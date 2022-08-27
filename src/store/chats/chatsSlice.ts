import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatsState} from './chatsType';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {buildDirectChat, Chat, ChatMember} from '../../models/Chat';
import {ChatsActions} from './chatsActions';
import {buildEventMessage, EventMessageType, Message} from '../../models/Message';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {FilterUtils} from '../../shared/utils/FilterUtils';

interface ChatDirectMessagePayload {
  message: Message;
  secondUserId: string;
}

interface ChatCreatePayload {
  chat: Chat;
  userIds: string[];
}

interface ChatMessageReadPayload {
  chatId: string;
  messageId: string;
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
    addChat: (state: ChatsState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      state.chats = ChatUtils.filterChats([chat, ...state.chats]);
    },

    createChat: (state: ChatsState, action: PayloadAction<ChatCreatePayload>) => {
      const chat = action.payload.chat;
      const userIds = action.payload.userIds;
      const eventType = chat.isDirect ? EventMessageType.CREATE_DIRECT_CHAT : EventMessageType.CREATE_CHAT;
      const lastMessage = buildEventMessage(chat.createdBy, eventType, userIds);
      const newChat = {...chat, lastMessage} as Chat;
      state.chats = ChatUtils.filterChats([newChat, ...state.chats]);
    },

    updateChat: (state: ChatsState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      state.chats = ArrayUtils.updateValueWithId(state.chats, chat);
    },

    removeChat: (state: ChatsState, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const chatInList = ArrayUtils.findValueById(state.chats, chatId);
      if (chatInList) {
        state.chats = ArrayUtils.deleteValueWithId(state.chats, chatInList);
      }
      state.unreadMap = ChatUtils.removeChatFromUnread(state.unreadMap, chatId);
      state.unreadCount = ChatUtils.calcUnreadCount(state.unreadMap);
    },

    updateLastMessage: (state: ChatsState, action: PayloadAction<Message>) => {
      const message = action.payload;
      const chatInList = state.chats.find((chat) => chat.id === message.chatId);
      if (chatInList) {
        state.chats = ArrayUtils.updateValueWithId(state.chats, {...chatInList, lastMessage: message} as Chat);
      }
    },

    updateLastDirectMessage: (state: ChatsState, action: PayloadAction<ChatDirectMessagePayload>) => {
      const message = action.payload.message;
      const secondUserId = action.payload.secondUserId;
      const chatInList = state.chats.find((chat) => chat.id === message.chatId);
      state.chats = chatInList
        ? ArrayUtils.updateValueWithId(state.chats, {...chatInList, lastMessage: message} as Chat)
        : ChatUtils.filterChats([buildDirectChat(message, secondUserId), ...state.chats]);
    },

    clearChat: (state: ChatsState, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const chatInList = state.chats.find((chat) => chat.id === chatId);
      if (chatInList) {
        const message = buildEventMessage(undefined, EventMessageType.CLEAR_CHAT, undefined);
        const updatedChat = {...chatInList, lastMessage: message};
        state.chats = ArrayUtils.updateValueWithId(state.chats, updatedChat);
      }
      state.unreadMap = ChatUtils.removeChatFromUnread(state.unreadMap, chatId);
      state.unreadCount = ChatUtils.calcUnreadCount(state.unreadMap);
    },

    addUnread: (state: ChatsState, action: PayloadAction<Message>) => {
      const message = action.payload;
      state.unreadMap = ChatUtils.addMessageToUnread(state.unreadMap, message);
      state.unreadCount = ChatUtils.calcUnreadCount(state.unreadMap);
    },

    removeUnread: (state: ChatsState, action: PayloadAction<ChatMessageReadPayload>) => {
      const chatId = action.payload.chatId;
      const messageId = action.payload.messageId;
      state.unreadMap = ChatUtils.removeMessageFromUnread(state.unreadMap, chatId, messageId);
      state.unreadCount = ChatUtils.calcUnreadCount(state.unreadMap);
    },

    addMembers: (state: ChatsState, action: PayloadAction<ChatMember[]>) => {
      const members = action.payload;
      const chatId = members[0].chatId;
      const chat = state.chats.find((chat) => chat.id === chatId);
      chat.members.push(...members);
      chat.members.filter(FilterUtils.uniqueByUserIdFilter);
      state.chats = ArrayUtils.updateValueWithId(state.chats, chat);
    },

    deleteMembers: (state: ChatsState, action: PayloadAction<ChatMember[]>) => {
      const members = action.payload;
      const chatId = members[0].chatId;
      const chat = state.chats.find((chat) => chat.id === chatId);
      let updatedMembers = chat.members;
      members.forEach((m) => (updatedMembers = ArrayUtils.deleteValueWithUserId(updatedMembers, m)));
      chat.members = updatedMembers;
      state.chats = ArrayUtils.updateValueWithId(state.chats, chat);
    },
  },
  extraReducers: (builder) => {
    /*
    fetchChats
    */
    builder.addCase(ChatsActions.fetchChatsThunk.pending, (state: ChatsState, action) => {
      const initialLoading = action.meta.arg === 0;
      state.loading = initialLoading;
      state.moreLoading = !initialLoading;
    });
    builder.addCase(ChatsActions.fetchChatsThunk.fulfilled, (state: ChatsState, action) => {
      const newChats = action.payload.data;
      const count = action.payload.count;
      state.chats = ChatUtils.filterChats([...state.chats, ...newChats]);
      state.loading = false;
      state.moreLoading = false;
      state.allLoaded = state.chats.length === count;
    });
    builder.addCase(ChatsActions.fetchChatsThunk.rejected, (state: ChatsState) => {
      state.loading = false;
      state.moreLoading = false;
    });

    /*
    refreshChats
    */
    builder.addCase(ChatsActions.refreshChatsThunk.pending, (state: ChatsState) => {
      state.chats = [];
      state.loading = true;
      state.moreLoading = false;
    });

    /*
    fetchFilteredChats
    */
    builder.addCase(ChatsActions.fetchFilteredChatsThunk.pending, (state: ChatsState) => {
      state.filteredChats = [];
    });
    builder.addCase(ChatsActions.fetchFilteredChatsThunk.fulfilled, (state: ChatsState, action) => {
      const chats = action.payload;
      state.filteredChats = ChatUtils.filterChats(chats);
    });
    builder.addCase(ChatsActions.fetchFilteredChatsThunk.rejected, (state: ChatsState) => {
      state.filteredChats = [];
    });

    /*
    fetchUnreadMessagesMap
    */
    builder.addCase(ChatsActions.fetchUnreadMessagesMapThunk.fulfilled, (state: ChatsState, action) => {
      const unreadMessagesMap = action.payload;
      state.unreadMap = [...unreadMessagesMap];
      state.unreadCount = ChatUtils.calcUnreadCount(state.unreadMap);
    });
  },
});

export default chatsSlice;
