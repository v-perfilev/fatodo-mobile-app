import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatState} from './chatType';
import {
  buildEventMessage,
  buildMessageReaction,
  buildMessageStatus,
  EventMessageType,
  Message,
  MessageReactions,
  MessageReactionType,
  MessageStatuses,
} from '../../models/Message';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ChatThunks} from './chatActions';
import {UserAccount} from '../../models/User';
import {MessageUtils} from '../../shared/utils/MessageUtils';
import {Chat} from '../../models/Chat';

interface ChatMessageIdPayload {
  messageId: string;
  account: UserAccount;
}

interface ChatMessagePayload {
  message: Message;
  account: UserAccount;
}

interface ChatReactionPayload {
  message: Message;
  reactionType: MessageReactionType;
  account: UserAccount;
}

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
    addMessageWs: (state: ChatState, action: PayloadAction<Message>) => {
      const message = action.payload;
      let messages = state.messages;
      if (state.chat.id === message.chatId) {
        const messageInList = MessageUtils.findMessage(state.messages, message);
        messages = messageInList
          ? ArrayUtils.replaceValue(state.messages, messageInList, message)
          : MessageUtils.filterMessages([message, ...state.messages]);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    updateMessageWs: (state: ChatState, action: PayloadAction<Message>) => {
      const message = action.payload;
      const messages = ArrayUtils.updateValueWithId(state.messages, message);
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    updateMessageStatusesWs: (state: ChatState, action: PayloadAction<MessageStatuses>) => {
      const chatId = action.payload.chatId;
      const messageId = action.payload.messageId;
      const statuses = action.payload.statuses;
      let messages = state.messages;
      if (state.chat.id === chatId) {
        const messageInList = ArrayUtils.findValueById(state.messages, messageId);
        const updatedMessage = {...messageInList, statuses};
        messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    updateMessageReactionsWs: (state: ChatState, action: PayloadAction<MessageReactions>) => {
      const chatId = action.payload.chatId;
      const messageId = action.payload.messageId;
      const reactions = action.payload.reactions;
      let messages = state.messages;
      if (state.chat.id === chatId) {
        const messageInList = ArrayUtils.findValueById(state.messages, messageId);
        const updatedMessage = {...messageInList, reactions};
        messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    selectChat: (state: ChatState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      return {...initialState, chat};
    },

    addMessage: (state: ChatState, action: PayloadAction<Message>) => {
      const message = action.payload;
      let messages = state.messages;
      if (state.chat.id === message.chatId) {
        messages = MessageUtils.filterMessages([message, ...state.messages]);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    editMessage: (state: ChatState, action: PayloadAction<Message>) => {
      const message = action.payload;
      let messages = state.messages;
      if (state.chat.id === message.chatId) {
        messages = ArrayUtils.updateValueWithId(messages, message);
      }
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
    },

    markMessageAsRead: (state: ChatState, action: PayloadAction<ChatMessageIdPayload>) => {
      const messageId = action.payload.messageId;
      const account = action.payload.account;
      const message = state.messages.find((m) => m.id === messageId);
      const status = message?.statuses.find((s) => s.userId === account.id);
      let messages = state.messages;
      if (!status) {
        const newStatus = buildMessageStatus(messageId, account.id, 'READ');
        const updatedStatuses = [...message.statuses, newStatus];
        const updatedMessage = {...message, statuses: updatedStatuses};
        messages = ArrayUtils.updateValueWithId(messages, updatedMessage);
      }
      return {...state, messages};
    },

    deleteMessageReaction: (state: ChatState, action: PayloadAction<ChatMessagePayload>) => {
      const message = action.payload.message;
      const account = action.payload.account;
      const reaction = message.reactions.find((s) => s.userId === account.id);
      let messages = state.messages;
      if (reaction) {
        const updatedReactions = ArrayUtils.deleteValue(message.reactions, reaction);
        const updatedMessage = {...message, reactions: updatedReactions};
        messages = ArrayUtils.updateValueWithId(messages, updatedMessage);
      }
      return {...state, messages};
    },

    setMessageReaction: (state: ChatState, action: PayloadAction<ChatReactionPayload>) => {
      const message = action.payload.message;
      const newReactionType = action.payload.reactionType;
      const account = action.payload.account;
      const reaction = message.reactions.find((s) => s.userId === account.id);
      let messages = state.messages;
      let updatedReactions = message.reactions;
      if (reaction) {
        updatedReactions = ArrayUtils.deleteValue(updatedReactions, reaction);
      }
      const newReaction = buildMessageReaction(message.id, account.id, newReactionType);
      updatedReactions = [...updatedReactions, newReaction];
      const updatedMessage = {...message, reactions: updatedReactions};
      messages = ArrayUtils.updateValueWithId(messages, updatedMessage);
      return {...state, messages};
    },

    clearChat: (state: ChatState) => {
      const message = buildEventMessage(undefined, EventMessageType.CLEAR_CHAT, undefined);
      const messages = [message];
      const chatItems = MessageUtils.convertMessagesToChatItems(messages);
      return {...state, messages, chatItems};
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
      const newMessages = action.payload.data;
      const count = action.payload.count;
      const messages = MessageUtils.filterMessages([...state.messages, ...newMessages]);
      const loading = false;
      const moreLoading = false;
      const allLoaded = messages.length === count;
      return {...state, messages, loading, moreLoading, allLoaded};
    });
    builder.addCase(ChatThunks.fetchMessages.rejected, (state: ChatState) => {
      const loading = false;
      const moreLoading = false;
      return {...state, loading, moreLoading};
    });

    /*
    refreshMessages
    */
    builder.addCase(ChatThunks.refreshMessages.pending, (state: ChatState) => {
      const messages = [] as Message[];
      const loading = true;
      const moreLoading = false;
      return {...state, messages, loading, moreLoading};
    });
  },
});

export default chatSlice;
