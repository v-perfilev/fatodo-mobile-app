import {createSlice} from '@reduxjs/toolkit';
import {ChatState} from './chatType';
import {Message} from '../../models/Message';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {ChatItem} from '../../models/ChatItem';
import {DateFormatters} from '../../shared/utils/DateUtils';
import {ChatThunks} from './chatActions';

const filterMessages = (messages: Message[]): Message[] => {
  return messages
    .filter(ArrayUtils.withIdFilter)
    .filter(ArrayUtils.uniqueByIdFilter)
    .sort(ArrayUtils.createdAtComparator);
};

const convertMessagesToChatItems = (messagesToConvert: Message[]): ChatItem[] => {
  const handledDates = [] as string[];
  const handledItems = [] as ChatItem[];
  messagesToConvert.forEach((message) => {
    const date = DateFormatters.formatDateWithYear(new Date(message.createdAt));
    if (!handledDates.includes(date)) {
      handledDates.push(date);
      handledItems.push({date});
    }
    handledItems.push({message});
  });
  return handledItems.reverse();
};

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
    selectChat: (state: ChatState, action) => ({
      ...state,
      chat: action.payload,
      messages: [],
      chatItems: [],
      loading: false,
      allLoaded: false,
    }),
  },
  extraReducers: (builder) => {
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
      const messages = filterMessages([...state.messages, ...newMessages]);
      const chatItems = convertMessagesToChatItems(messages);
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
