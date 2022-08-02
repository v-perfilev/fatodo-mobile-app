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
  moreLoading: false,
  allLoaded: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChat: (state: ChatState, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      return {...initialState, chat};
    },

    addMessage: (state: ChatState, action: PayloadAction<Message>) => {
      const message = action.payload;
      if (state.chat.id === message.chatId) {
        const messageInList = MessageUtils.findMessage(state.messages, message);
        state.messages = messageInList
          ? ArrayUtils.replaceValue(state.messages, messageInList, message)
          : MessageUtils.filterMessages([message, ...state.messages]);
        state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
      }
    },

    updateMessage: (state: ChatState, action: PayloadAction<Message>) => {
      const message = action.payload;
      if (state.chat.id === message.chatId) {
        state.messages = ArrayUtils.updateValueWithId(state.messages, message);
        state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
      }
    },

    updateMessageStatuses: (state: ChatState, action: PayloadAction<MessageStatuses>) => {
      const chatId = action.payload.chatId;
      const messageId = action.payload.messageId;
      const statuses = action.payload.statuses;
      if (state.chat.id === chatId) {
        const messageInList = ArrayUtils.findValueById(state.messages, messageId);
        const updatedMessage = {...messageInList, statuses};
        state.messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
        state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
      }
    },

    markMessageAsRead: (state: ChatState, action: PayloadAction<ChatMessageIdPayload>) => {
      const messageId = action.payload.messageId;
      const account = action.payload.account;
      const message = state.messages.find((m) => m.id === messageId);
      const status = message?.statuses.find((s) => s.userId === account.id);
      if (!status) {
        const newStatus = buildMessageStatus(messageId, account.id, 'READ');
        const updatedMessage = {...message, statuses: [...message.statuses, newStatus]};
        state.messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
        state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
      }
    },

    updateMessageReactions: (state: ChatState, action: PayloadAction<MessageReactions>) => {
      const chatId = action.payload.chatId;
      const messageId = action.payload.messageId;
      const reactions = action.payload.reactions;
      if (state.chat.id === chatId) {
        const messageInList = ArrayUtils.findValueById(state.messages, messageId);
        const updatedMessage = {...messageInList, reactions};
        state.messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
        state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
      }
    },

    deleteMessageReaction: (state: ChatState, action: PayloadAction<ChatMessagePayload>) => {
      const message = action.payload.message;
      const account = action.payload.account;
      const reaction = message.reactions.find((s) => s.userId === account.id);
      if (reaction) {
        const updatedReactions = ArrayUtils.deleteValue(message.reactions, reaction);
        const updatedMessage = {...message, reactions: updatedReactions};
        state.messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
        state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
      }
    },

    setMessageReaction: (state: ChatState, action: PayloadAction<ChatReactionPayload>) => {
      const message = action.payload.message;
      const newReactionType = action.payload.reactionType;
      const account = action.payload.account;
      const reaction = message.reactions.find((s) => s.userId === account.id);
      let oldReactions = reaction ? ArrayUtils.deleteValue(message.reactions, reaction) : message.reactions;
      const newReaction = buildMessageReaction(message.id, account.id, newReactionType);
      const updatedMessage = {...message, reactions: [...oldReactions, newReaction]};
      state.messages = ArrayUtils.updateValueWithId(state.messages, updatedMessage);
      state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
    },

    clearChat: (state: ChatState) => {
      const message = buildEventMessage(undefined, EventMessageType.CLEAR_CHAT, undefined);
      state.messages = [message];
      state.chatItems = MessageUtils.convertMessagesToChatItems(state.messages);
    },
  },
  extraReducers: (builder) => {
    /*
    fetchChat
    */
    builder.addCase(ChatThunks.fetchChat.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(ChatThunks.fetchChat.fulfilled, (state: ChatState, action) => {
      state.chat = action.payload;
      state.loading = false;
    });
    builder.addCase(ChatThunks.fetchChat.rejected, (state: ChatState) => {
      state.loading = false;
    });

    /*
    fetchMessages
    */
    builder.addCase(ChatThunks.fetchMessages.pending, (state: ChatState, action) => {
      const initialLoading = action.meta.arg.offset === 0;
      state.loading = initialLoading;
      state.moreLoading = !initialLoading;
    });
    builder.addCase(ChatThunks.fetchMessages.fulfilled, (state: ChatState, action) => {
      const newMessages = action.payload.data;
      const count = action.payload.count;
      state.messages = MessageUtils.filterMessages([...state.messages, ...newMessages]);
      state.loading = false;
      state.moreLoading = false;
      state.allLoaded = state.messages.length === count;
    });
    builder.addCase(ChatThunks.fetchMessages.rejected, (state: ChatState) => {
      state.loading = false;
      state.moreLoading = false;
    });

    /*
    refreshMessages
    */
    builder.addCase(ChatThunks.refreshMessages.pending, (state: ChatState) => {
      state.messages = [] as Message[];
      state.loading = true;
      state.moreLoading = false;
    });
  },
});

export default chatSlice;
