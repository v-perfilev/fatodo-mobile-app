import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import userSlice from './userSlice';
import UserService from '../../services/UserService';
import ContactService from '../../services/ContactService';
import {InfoActions} from '../info/infoActions';

const PREFIX = 'user/';

export class UserActions {
  static selectUserThunk = createAsyncThunk(PREFIX + 'selectUser', async (user: User, thunkAPI) => {
    await thunkAPI.dispatch(userSlice.actions.setUser(user));
    await Promise.all([
      thunkAPI.dispatch(UserActions.fetchCommonGroupsThunk(user.id)),
      thunkAPI.dispatch(UserActions.fetchCommonRelationsThunk(user.id)),
    ]);
  });

  static fetchUserThunk = createAsyncThunk(PREFIX + 'fetchUser', async (userId: string, thunkAPI) => {
    const result = await UserService.getAllByIds([userId]);
    if (result.data.length !== 1) {
      thunkAPI.rejectWithValue(undefined);
    } else {
      await Promise.all([
        thunkAPI.dispatch(UserActions.fetchCommonGroupsThunk(userId)),
        thunkAPI.dispatch(UserActions.fetchCommonRelationsThunk(userId)),
      ]);
      return result.data[0];
    }
  });

  static fetchCommonGroupsThunk = createAsyncThunk(PREFIX + 'fetchCommonGroups', async (userId: string) => {
    const result = await ItemService.getAllCommonGroups(userId);
    return result.data;
  });

  static fetchCommonRelationsThunk = createAsyncThunk(
    PREFIX + 'fetchCommonRelations',
    async (userId: string, thunkAPI) => {
      const result = await ContactService.getCommonRelations(userId);
      const relationUserIds = result.data.map((r) => r.secondUserId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(relationUserIds));
      return result.data;
    },
  );
}
