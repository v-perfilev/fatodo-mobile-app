import {createSlice} from '@reduxjs/toolkit';
import {ChatsState} from './chatsType';
import ChatsThunks from './chatsThunks';

const initialState: ChatsState = {
  chats: [],
  loading: false,
  allLoaded: false,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    test: (state: ChatsState) => ({
      ...state,
    }),
  },
  extraReducers: (builder) => {
    /*
    register
    */
    builder.addCase(ChatsThunks.fetchChats.pending, () => ({
      ...initialState,
      loading: true,
    }));
    builder.addCase(ChatsThunks.fetchChats.fulfilled, () => ({
      ...initialState,
    }));
    builder.addCase(ChatsThunks.fetchChats.rejected, () => ({
      ...initialState,
    }));
  },
});

export default chatsSlice;
