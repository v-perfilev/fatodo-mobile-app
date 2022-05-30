import {AppDispatch, RootState} from '../store';
import {User} from '../../models/User';
import usersSlice from './usersSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import UserService from '../../services/UserService';

export class UsersActions {
  static handleUsers = (users: User[]) => async (dispatch: AppDispatch) => {
    dispatch(usersSlice.actions.handleUsers(users));
  };
}

enum TYPES {
  HANDLE_USER_IDS = 'users/handleUserIds',
  FETCH_USER_IDS = 'users/fetchUserIds',
  FETCH_USERS_BY_USERNAME_PART = 'users/fetchUsersByUsernamePart',
  FETCH_USERS_BY_USERNAME_OR_EMAIL = 'users/fetchUsersByUsernameOrEmail',
}

export class UsersThunks {
  static handleUserIds = createAsyncThunk(TYPES.HANDLE_USER_IDS, async (ids: string[], thunkAPI) => {
    const {
      users: {users, loadingIds},
    } = thunkAPI.getState() as RootState;
    const existingIds = users.map((user) => user.id);
    const notAllowedIds = [...existingIds, ...loadingIds];
    const idsToLoad = ids
      .filter(ArrayUtils.notUndefinedFilter)
      .filter(ArrayUtils.uniqueFilter)
      .filter((id) => !notAllowedIds.includes(id));
    thunkAPI.dispatch(UsersThunks.fetchUserIds(idsToLoad));
  });

  static fetchUserIds = createAsyncThunk(TYPES.FETCH_USER_IDS, async (ids: string[]) => {
    let result = [] as User[];
    if (ids.length > 0) {
      const response = await UserService.getAllByIds(ids);
      result = response.data;
    }
    return result;
  });

  static fetchUsersByUsernamePart = createAsyncThunk(TYPES.FETCH_USERS_BY_USERNAME_PART, async (part: string) => {
    const result = await UserService.getAllByUsernamePart(part);
    return result.data;
  });

  static fetchUsersByUsernameOrEmail = createAsyncThunk(
    TYPES.FETCH_USERS_BY_USERNAME_OR_EMAIL,
    async (usernameOrEmail: string) => {
      const result = await UserService.getByUsernameOrEmail(usernameOrEmail);
      return result.data;
    },
  );
}
