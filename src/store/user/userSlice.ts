import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {UserState} from './userType';
import {UserActions} from './userActions';

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
    reset: () => initialState,

    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchUser
    */
    builder.addCase(UserActions.fetchUserThunk.pending, () => {
      const loading = true;
      return {...initialState, loading};
    });
    builder.addCase(UserActions.fetchUserThunk.fulfilled, (state: UserState, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(UserActions.fetchUserThunk.rejected, (state: UserState) => {
      state.loading = false;
    });

    /*
    fetchCommonGroups
    */
    builder.addCase(UserActions.fetchCommonGroupsThunk.pending, (state: UserState) => {
      state.groups = [];
      state.loading = true;
    });
    builder.addCase(UserActions.fetchCommonGroupsThunk.fulfilled, (state: UserState, action) => {
      state.groups = action.payload;
      state.loading = false;
    });
    builder.addCase(UserActions.fetchCommonGroupsThunk.rejected, (state: UserState) => {
      state.groups = [];
      state.loading = false;
    });

    /*
    fetchCommonRelations
    */
    builder.addCase(UserActions.fetchCommonRelationsThunk.pending, (state: UserState) => {
      state.relations = [];
      state.loading = true;
    });
    builder.addCase(UserActions.fetchCommonRelationsThunk.fulfilled, (state: UserState, action) => {
      state.relations = action.payload;
      state.loading = false;
    });
    builder.addCase(UserActions.fetchCommonRelationsThunk.rejected, (state: UserState) => {
      state.relations = [];
      state.loading = false;
    });
  },
});

export default userSlice;
