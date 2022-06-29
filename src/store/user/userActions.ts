import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import userSlice from './userSlice';
import UserService from '../../services/UserService';
import ContactService from '../../services/ContactService';

enum TYPES {
  SELECT_USER = 'user/selectUser',
  FETCH_USER = 'user/fetchUser',
  FETCH_COMMON_GROUPS = 'user/fetchCommonGroups',
  FETCH_COMMON_RELATIONS = 'user/fetchCommonRelations',
}

export class UserThunks {
  static selectUser = createAsyncThunk(TYPES.SELECT_USER, async (user: User, thunkAPI) => {
    await thunkAPI.dispatch(userSlice.actions.setUser(user));
    await Promise.all([
      thunkAPI.dispatch(UserThunks.fetchCommonGroups(user.id)),
      thunkAPI.dispatch(UserThunks.fetchCommonRelations(user.id)),
    ]);
  });

  static fetchUser = createAsyncThunk(TYPES.FETCH_USER, async (userId: string, thunkAPI) => {
    const result = await UserService.getAllByIds([userId]);
    if (result.data.length !== 1) {
      thunkAPI.rejectWithValue(undefined);
    } else {
      await Promise.all([
        thunkAPI.dispatch(UserThunks.fetchCommonGroups(userId)),
        thunkAPI.dispatch(UserThunks.fetchCommonRelations(userId)),
      ]);
      return result.data[0];
    }
  });

  static fetchCommonGroups = createAsyncThunk(TYPES.FETCH_COMMON_GROUPS, async (userId: string) => {
    const result = await ItemService.getAllCommonGroups(userId);
    return result.data;
  });

  static fetchCommonRelations = createAsyncThunk(TYPES.FETCH_COMMON_RELATIONS, async (userId: string) => {
    const result = await ContactService.getCommonRelations(userId);
    return result.data;
  });
}
