import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {UserState} from './userType';
import {UserActions} from './userActions';
import {Group} from '../../models/Group';
import {ContactRelation} from '../../models/Contact';

const initialState: UserState = {
  user: undefined,
  groups: [],
  relations: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state: UserState) => {
      Object.assign(state, initialState);
    },

    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    setGroups: (state: UserState, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },

    setRelations: (state: UserState, action: PayloadAction<ContactRelation[]>) => {
      state.relations = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    selectUser
    */
    builder.addCase(UserActions.selectUserThunk.pending, (state) => {
      userSlice.caseReducers.reset(state);
    });
    builder.addCase(UserActions.selectUserThunk.fulfilled, (state, action) => {
      userSlice.caseReducers.setUser(state, action);
    });

    /*
    fetchUser
    */
    builder.addCase(UserActions.fetchUserThunk.pending, (state) => {
      userSlice.caseReducers.reset(state);
    });
    builder.addCase(UserActions.fetchUserThunk.fulfilled, (state, action) => {
      userSlice.caseReducers.setUser(state, action);
    });

    /*
    fetchCommonGroups
    */
    builder.addCase(UserActions.fetchCommonGroupsThunk.fulfilled, (state: UserState, action) => {
      userSlice.caseReducers.setGroups(state, action);
    });

    /*
    fetchCommonRelations
    */
    builder.addCase(UserActions.fetchCommonRelationsThunk.fulfilled, (state: UserState, action) => {
      userSlice.caseReducers.setRelations(state, action);
    });
  },
});

export default userSlice;
