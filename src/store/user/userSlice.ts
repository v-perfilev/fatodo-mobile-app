import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {UserState} from './userType';
import {UserThunks} from './userActions';
import {Group} from '../../models/Group';
import {ContactRelation} from '../../models/ContactRelation';

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

    /*
    fetchCommonRelations
    */
    builder.addCase(UserThunks.fetchCommonRelations.pending, (state: UserState) => {
      const relations = [] as ContactRelation[];
      return {...state, relations, loading: true};
    });
    builder.addCase(UserThunks.fetchCommonRelations.fulfilled, (state: UserState, action) => {
      const relations = action.payload;
      return {...state, relations, loading: false};
    });
    builder.addCase(UserThunks.fetchCommonRelations.rejected, (state: UserState) => {
      const relations = [] as ContactRelation[];
      return {...state, relations, loading: false};
    });
  },
});

export default userSlice;
