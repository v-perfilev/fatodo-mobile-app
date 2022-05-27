import {createSlice} from '@reduxjs/toolkit';
import {ChatsState} from './chatsType';
import ChatsThunks from './chatsThunks';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';

const initialState: ChatsState = {
  chats: [],
  loading: false,
  moreLoading: false,
  allLoaded: false,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (state: ChatsState, action) => {
      const chat = action.payload;
      const chats = ArrayUtils.addValueToStart(state.chats, chat);
      return {...state, chats};
    },
    updateChat: (state: ChatsState, action) => {
      const chat = action.payload;
      const chats = ArrayUtils.updateValue(state.chats, chat);
      return {...state, chats};
    },
    removeChat: (state: ChatsState, action) => {
      const chat = action.payload;
      const chats = ArrayUtils.deleteValue(state.chats, chat);
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
      return {...state, chats, loading, moreLoading};
    });
    builder.addCase(ChatsThunks.fetchChats.rejected, (state: ChatsState) => {
      const loading = false;
      const moreLoading = false;
      return {...state, loading, moreLoading};
    });
  },
});

export default chatsSlice;
