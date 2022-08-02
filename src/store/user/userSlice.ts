import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {UserState} from './userType';
import {UserThunks} from './userActions';

const initialState: UserState = {
  user: undefined,
  groups: [],
  relations: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchUser
    */
    builder.addCase(UserThunks.fetchUser.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(UserThunks.fetchUser.fulfilled, (state: UserState, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(UserThunks.fetchUser.rejected, (state: UserState) => {
      state.loading = false;
    });

    /*
    fetchCommonGroups
    */
    builder.addCase(UserThunks.fetchCommonGroups.pending, (state: UserState) => {
      state.groups = [];
      state.loading = true;
    });
    builder.addCase(UserThunks.fetchCommonGroups.fulfilled, (state: UserState, action) => {
      state.groups = action.payload;
      state.loading = false;
    });
    builder.addCase(UserThunks.fetchCommonGroups.rejected, (state: UserState) => {
      state.groups = [];
      state.loading = false;
    });

    /*
    fetchCommonRelations
    */
    builder.addCase(UserThunks.fetchCommonRelations.pending, (state: UserState) => {
      state.relations = [];
      state.loading = true;
    });
    builder.addCase(UserThunks.fetchCommonRelations.fulfilled, (state: UserState, action) => {
      state.relations = action.payload;
      state.loading = false;
    });
    builder.addCase(UserThunks.fetchCommonRelations.rejected, (state: UserState) => {
      state.relations = [];
      state.loading = false;
    });
  },
});

export default userSlice;
