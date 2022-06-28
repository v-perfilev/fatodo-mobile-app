import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {UserState} from './userType';
import {UserThunks} from './userActions';
import {Group} from '../../models/Group';

const initialState: UserState = {
  user: undefined,
  groups: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      const user = action.payload;
      return {...state, user};
    },
  },
  extraReducers: (builder) => {
    /*
    fetchUser
    */
    builder.addCase(UserThunks.fetchUser.pending, () => {
      return {...initialState, loading: true};
    });
    builder.addCase(UserThunks.fetchUser.fulfilled, (state: UserState, action) => {
      const user = action.payload;
      return {...state, user, loading: false};
    });
    builder.addCase(UserThunks.fetchUser.rejected, (state: UserState) => {
      return {...state, loading: false};
    });

    /*
    fetchCommonGroups
    */
    builder.addCase(UserThunks.fetchCommonGroups.pending, (state: UserState) => {
      const groups = [] as Group[];
      return {...state, groups, loading: true};
    });
    builder.addCase(UserThunks.fetchCommonGroups.fulfilled, (state: UserState, action) => {
      const groups = action.payload;
      return {...state, groups, loading: false};
    });
    builder.addCase(UserThunks.fetchCommonGroups.rejected, (state: UserState) => {
      const groups = [] as Group[];
      return {...state, groups, loading: false};
    });
  },
});

export default userSlice;
