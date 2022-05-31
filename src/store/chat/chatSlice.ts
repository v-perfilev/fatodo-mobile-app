import {createSlice} from '@reduxjs/toolkit';
import {ChatState} from './chatType';
import {Message, MessageReactionType, MessageStatus} from '../../models/Message';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ChatThunks} from './chatActions';
import {UserAccount} from '../../models/User';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {MessageUtils} from '../../shared/utils/MessageUtils';

const initialState: ChatState = {
  chat: undefined,
  messages: [],
  chatItems: [],
  loading: false,
  allLoaded: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChat: (state: ChatState, action) => {
      return {...initialState, chat: action.payload};
    },

    addMessage: (state: ChatState, action) => {
      const message = action.payload as Message;
      let messages = state.messages;
      if (state.chat.id === message.chatId) {
        messages = ChatUtils.filterMessages([message, ...state.messages]);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    editMessage: (state: ChatState, action) => {
      const message = action.payload as Message;
      let messages = state.messages;
      if (state.chat.id === message.chatId) {
        messages = ArrayUtils.updateValue(messages, message);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    markMessageAsRead: (state: ChatState, action) => {
      const messageId = action.payload.messageId as string;
      const account = action.payload.account as UserAccount;
      const message = state.messages.find((m) => m.id === messageId);
      const status = message?.statuses.find((s) => s.userId === account.id);
      let messages = state.messages;
      if (!status) {
        const newStatus = {} as MessageStatus;
        message.reactions = ArrayUtils.addValueToEnd(message.statuses, newStatus);
        messages = ArrayUtils.updateValue(messages, message);
      }
      return {...state, messages};
    },

    deleteMessageReaction: (state: ChatState, action) => {
      const message = action.payload.message as Message;
      const account = action.payload.account as UserAccount;
      const reaction = message.reactions.find((s) => s.userId === account.id);
      let messages = state.messages;
      if (reaction) {
        message.reactions = ArrayUtils.deleteValue(message.reactions, reaction);
        messages = ArrayUtils.updateValue(messages, message);
      }
      return {...state, messages};
    },

    setMessageReaction: (state: ChatState, action) => {
      const message = action.payload.message as Message;
      const newReactionType = action.payload.reactionType as MessageReactionType;
      const account = action.payload.account as UserAccount;
      const reaction = message.reactions.find((s) => s.userId === account.id);
      let messages = state.messages;
      if (reaction) {
        message.reactions = ArrayUtils.deleteValue(message.reactions, reaction);
      }
      const newReaction = MessageUtils.createStubReaction(message.id, account.id, newReactionType);
      message.reactions = ArrayUtils.addValueToEnd(message.reactions, newReaction);
      messages = ArrayUtils.updateValue(messages, message);
      return {...state, messages};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchChat
    */
    builder.addCase(ChatThunks.fetchChat.pending, () => {
      return {...initialState, loading: true};
    });
    builder.addCase(ChatThunks.fetchChat.fulfilled, (state: ChatState, action) => {
      const chat = action.payload;
      return {...state, chat, loading: false};
    });
    builder.addCase(ChatThunks.fetchChat.rejected, (state: ChatState) => {
      return {...state, loading: false};
    });

    /*
    fetchMessages
    */
    builder.addCase(ChatThunks.fetchMessages.pending, (state: ChatState, action) => {
      const initialLoading = action.meta.arg.offset === 0;
      const loading = initialLoading;
      const moreLoading = !initialLoading;
      return {...state, loading, moreLoading};
    });
    builder.addCase(ChatThunks.fetchMessages.fulfilled, (state: ChatState, action) => {
      const newMessages = action.payload;
      const messages = ChatUtils.filterMessages([...state.messages, ...newMessages]);
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      const loading = false;
      const moreLoading = false;
      const allLoaded = newMessages.length === 0;
      return {...state, messages, chatItems, loading, moreLoading, allLoaded};
    });
    builder.addCase(ChatThunks.fetchMessages.rejected, (state: ChatState) => {
      const loading = false;
      const moreLoading = false;
      return {...state, loading, moreLoading};
    });
  },
});

export default chatSlice;
