import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import UserService from '../../services/UserService';
import ContactService from '../../services/ContactService';
import {InfoActions} from '../info/infoActions';
import {ContactRelation} from '../../models/Contact';
import {AsyncThunkConfig} from '../store';
import {Group} from '../../models/Group';

const PREFIX = 'user/';

export class UserActions {
  static selectUserThunk = createAsyncThunk<User, User, AsyncThunkConfig>(
    PREFIX + 'selectUser',
    async (user: User, thunkAPI) => {
      thunkAPI.dispatch(UserActions.fetchCommonGroupsThunk(user.id));
      thunkAPI.dispatch(UserActions.fetchCommonRelationsThunk(user.id));
      return user;
    },
  );

  static fetchUserThunk = createAsyncThunk<User, string, AsyncThunkConfig>(
    PREFIX + 'fetchUser',
    async (userId: string, thunkAPI) => {
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
    },
  );

  static fetchCommonGroupsThunk = createAsyncThunk<Group[], string, AsyncThunkConfig>(
    PREFIX + 'fetchCommonGroups',
    async (userId) => {
      const result = await ItemService.getAllCommonGroups(userId);
      return result.data;
    },
  );

  static fetchCommonRelationsThunk = createAsyncThunk<ContactRelation[], string, AsyncThunkConfig>(
    PREFIX + 'fetchCommonRelations',
    async (userId, thunkAPI) => {
      const result = await ContactService.getCommonRelations(userId);
      const relationUserIds = result.data.map((r) => r.secondUserId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(relationUserIds));
      return result.data;
    },
  );
}
