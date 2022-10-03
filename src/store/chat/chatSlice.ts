import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatState} from './chatType';
import {ChatItem, Message, MessageReaction, MessageStatus} from '../../models/Message';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ChatActions} from './chatActions';
import {Chat} from '../../models/Chat';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';
import {DateFormatters} from '../../shared/utils/DateFormatters';
import {UserAccount} from '../../models/User';

const initialState: ChatState = {
  chatId: undefined,
  chat: undefined,
  messages: [],
  chatItems: [],
  allLoaded: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: (state: ChatState) => {
      Object.assign(state, initialState);
    },

    setChatId: (state: ChatState, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },

    setChat: (state: ChatState, action: PayloadAction<Chat>) => {
      state.chatId = action.payload?.id;
      state.chat = action.payload;
    },

    resetMessages: (state: ChatState) => {
      state.messages = [];
      state.chatItems = [];
    },

    setMessages: (state: ChatState, action: PayloadAction<{messages: Message[]; account: UserAccount}>) => {
      const messages = action.payload.messages;
      const account = action.payload.account;
      const chatId = messages.length > 0 && messages[0].chatId;
      if (chatId && state.chatId === chatId) {
        state.messages = filterMessages([...messages, ...state.messages]);
        state.chatItems = convertMessagesToChatItems(state.messages, account);
      }
    },

    setMessageReaction: (
      state: ChatState,
      action: PayloadAction<{reaction: MessageReaction; account: UserAccount}>,
    ) => {
      const reaction = action.payload.reaction;
      const account = action.payload.account;
      if (state.chatId === reaction.chatId) {
        const message = state.messages.find((m) => m.id === reaction.messageId);
        if (message) {
          message.reactions =
            reaction.type === 'NONE'
              ? ArrayUtils.deleteValueWithUserId(message.reactions, reaction)
              : filterReactions([reaction, ...message.reactions]);
          state.messages = filterMessages([message, ...state.messages]);
          state.chatItems = convertMessagesToChatItems(state.messages, account);
        }
      }
    },

    setMessageStatus: (state: ChatState, action: PayloadAction<{status: MessageStatus; account: UserAccount}>) => {
      const status = action.payload.status;
      const account = action.payload.account;
      if (state.chatId === status.chatId) {
        const message = state.messages.find((m) => m.id === status.messageId);
        if (message) {
          message.statuses = filterStatuses([status, ...message.statuses]);
          state.messages = filterMessages([message, ...state.messages]);
          state.chatItems = convertMessagesToChatItems(state.messages, account);
        }
      }
    },

    calculateAllLoaded: (state: ChatState, action: PayloadAction<number>) => {
      state.allLoaded = state.messages.length === action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchChat
    */
    builder.addCase(ChatActions.fetchChatThunk.pending, (state, action) => {
      chatSlice.caseReducers.reset(state);
      chatSlice.caseReducers.setChatId(state, {...action, payload: action.meta.arg});
    });
    builder.addCase(ChatActions.fetchChatThunk.fulfilled, (state, action) => {
      chatSlice.caseReducers.setChat(state, action);
    });

    /*
    fetchMessages
    */
    builder.addCase(ChatActions.fetchMessagesThunk.fulfilled, (state, action) => {
      const messages = action.payload.list.data;
      const count = action.payload.list.count;
      const account = action.payload.account;
      chatSlice.caseReducers.setMessages(state, {...action, payload: {messages, account}});
      chatSlice.caseReducers.calculateAllLoaded(state, {...action, payload: count});
    });

    /*
    refreshMessages
    */
    builder.addCase(ChatActions.refreshMessagesThunk.fulfilled, (state, action) => {
      const messages = action.payload.list.data;
      const count = action.payload.list.count;
      const account = action.payload.account;
      chatSlice.caseReducers.resetMessages(state);
      chatSlice.caseReducers.setMessages(state, {...action, payload: {messages, account}});
      chatSlice.caseReducers.calculateAllLoaded(state, {...action, payload: count});
    });
  },
});

const filterMessages = (messages: Message[]): Message[] => {
  return messages
    .filter(FilterUtils.uniqueByIdFilter)
    .filter(FilterUtils.uniqueByUserIdAndTextFilter)
    .sort(ComparatorUtils.createdAtComparator);
};

const filterReactions = (reactions: MessageReaction[]): MessageReaction[] => {
  return reactions.filter(FilterUtils.uniqueByUserIdFilter).sort(ComparatorUtils.createdAtComparator);
};

const filterStatuses = (statuses: MessageStatus[]): MessageStatus[] => {
  return statuses.filter(FilterUtils.uniqueByUserIdFilter).sort(ComparatorUtils.createdAtComparator);
};

const convertMessagesToChatItems = (messagesToConvert: Message[], account: UserAccount): ChatItem[] => {
  const handledDates: string[] = [];
  const handledItems: ChatItem[] = [];
  messagesToConvert.forEach((message) => {
    const date = DateFormatters.formatDate(new Date(message.createdAt), account, undefined, 'FULL');
    if (!handledDates.includes(date)) {
      handledDates.push(date);
      handledItems.push({date});
    }
    handledItems.push({message});
  });
  return handledItems.reverse();
};

export default chatSlice;
