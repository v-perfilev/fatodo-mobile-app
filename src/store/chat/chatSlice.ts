import {createSlice} from '@reduxjs/toolkit';
import {ChatState} from './chatType';
import ChatThunks from './chatThunks';

const initialState: ChatState = {
  chat: undefined,
  messages: [],
  loading: false,
  allLoaded: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    test: (state: ChatState) => ({
      ...state,
    }),
  },
  extraReducers: (builder) => {
    /*
    register
    */
    builder.addCase(ChatThunks.fetchChats.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(ChatThunks.fetchChats.fulfilled, () => ({
      ...initialState,
    }));
    builder.addCase(ChatThunks.fetchChats.rejected, () => ({
      ...initialState,
    }));
  },
});

export default chatSlice;
