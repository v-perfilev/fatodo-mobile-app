import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatState} from './chatType';
import {ChatItem, Message, MessageReaction, MessageStatus} from '../../models/Message';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ChatActions} from './chatActions';
import {Chat} from '../../models/Chat';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ComparatorUtils} from '../../shared/utils/ComparatorUtils';
import {DateFormatters} from '../../shared/utils/DateFormatters';

const initialState: ChatState = {
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

    setChat: (state: ChatState, action: PayloadAction<Chat>) => {
      state.chat = action.payload;
    },

    resetMessages: (state: ChatState) => {
      state.messages = [];
      state.chatItems = [];
    },

    setMessages: (state: ChatState, action: PayloadAction<Message[]>) => {
      const messages = action.payload;
      if (state.chat.id === messages[0].chatId) {
        state.messages = filterMessages([...messages, ...state.messages]);
        state.chatItems = convertMessagesToChatItems(state.messages);
      }
    },

    setMessageReaction: (state: ChatState, action: PayloadAction<MessageReaction>) => {
      const reaction = action.payload;
      if (state.chat.id === reaction.chatId) {
        const message = state.messages.find((m) => m.id === reaction.messageId);
        if (message) {
          message.reactions =
            reaction.type === 'NONE'
              ? ArrayUtils.deleteValueWithUserId(message.reactions, reaction)
              : filterReactions([reaction, ...message.reactions]);
          state.messages = filterMessages([message, ...state.messages]);
          state.chatItems = convertMessagesToChatItems(state.messages);
        }
      }
    },

    setMessageStatus: (state: ChatState, action: PayloadAction<MessageStatus>) => {
      const status = action.payload;
      if (state.chat.id === status.chatId) {
        const message = state.messages.find((m) => m.id === status.messageId);
        if (message) {
          message.statuses = filterStatuses([status, ...message.statuses]);
          state.messages = filterMessages([message, ...state.messages]);
          state.chatItems = convertMessagesToChatItems(state.messages);
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
    builder.addCase(ChatActions.fetchChatThunk.pending, (state) => {
      chatSlice.caseReducers.reset(state);
    });
    builder.addCase(ChatActions.fetchChatThunk.fulfilled, (state, action) => {
      chatSlice.caseReducers.setChat(state, action);
    });

    /*
    fetchMessages
    */
    builder.addCase(ChatActions.fetchMessagesThunk.fulfilled, (state, action) => {
      chatSlice.caseReducers.setMessages(state, {...action, payload: action.payload.data});
      chatSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
    });

    /*
    refreshMessages
    */
    builder.addCase(ChatActions.refreshMessagesThunk.fulfilled, (state, action) => {
      chatSlice.caseReducers.resetMessages(state);
      chatSlice.caseReducers.setMessages(state, {...action, payload: action.payload.data});
      chatSlice.caseReducers.calculateAllLoaded(state, {...action, payload: action.payload.count});
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

const convertMessagesToChatItems = (messagesToConvert: Message[]): ChatItem[] => {
  const handledDates: string[] = [];
  const handledItems: ChatItem[] = [];
  messagesToConvert.forEach((message) => {
    const date = DateFormatters.formatDate(new Date(message.createdAt), undefined, undefined, 'FULL');
    if (!handledDates.includes(date)) {
      handledDates.push(date);
      handledItems.push({date});
    }
    handledItems.push({message});
  });
  return handledItems.reverse();
};

export default chatSlice;
