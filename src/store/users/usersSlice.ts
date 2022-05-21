import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UsersState} from './usersType';
import {User} from '../../models/User';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import UsersThunks from './usersThunks';

const initialState: UsersState = {
  users: [],
  loadingIds: [],
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    handleUsers: (state: UsersState, action: PayloadAction<User[]>) => {
      const users = [...action.payload, ...state.users].filter(ArrayUtils.uniqueByIdFilter);
      return {
        ...state,
        users,
      };
    },
  },
  extraReducers: (builder) => {
    /*
    handleUserIds
    */
    builder.addCase(UsersThunks.handleUserIds.pending, (state) => ({
      ...state,
      loading: true,
    }));

    /*
    fetchUserIds
    */
    builder.addCase(UsersThunks.fetchUserIds.pending, (state, action) => {
      const loadingIds = [...state.loadingIds, ...action.meta.arg];
      return {...state, loadingIds, loading: true};
    });
    builder.addCase(UsersThunks.fetchUserIds.fulfilled, (state, action) => {
      const users = [...action.payload, ...state.users].filter(ArrayUtils.uniqueByIdFilter);
      const loadingIds = state.loadingIds.filter((id) => !action.meta.arg.includes(id));
      return {...state, users, loadingIds, loading: false};
    });
    builder.addCase(UsersThunks.fetchUserIds.rejected, (state, action) => {
      const loadingIds = state.loadingIds.filter((id) => !action.meta.arg.includes(id));
      return {...state, loadingIds, loading: false};
    });
  },
});

export default usersSlice;
