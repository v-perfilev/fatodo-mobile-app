import {createSlice} from '@reduxjs/toolkit';
import {CommentsState} from './commentsType';
import {CommentsThunks} from './commentsActions';

const initialState: CommentsState = {
  targetId: undefined,
  comments: [],
  loading: false,
  moreLoading: false,
  allLoaded: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*
    test
    */
    builder.addCase(CommentsThunks.test.pending, (state: CommentsState) => {
      return {...state};
    });
    builder.addCase(CommentsThunks.test.fulfilled, (state: CommentsState) => {
      return {...state};
    });
    builder.addCase(CommentsThunks.test.rejected, (state: CommentsState) => {
      return {...state};
    });
  },
});

export default commentsSlice;
