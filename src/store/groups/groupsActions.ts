import {AppDispatch} from '../store';
import groupsSlice from './groupsSlice';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {SnackActions} from '../snack/snackActions';

export class GroupsActions {
  static setGroups = (groups: Group[]) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setGroups(groups));
  };

  static cacheGroups = () => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.cacheGroups());
  };

  static resetGroupsFromCache = () => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.resetGroupsFromCache());
  };

  static setCollapsed = (id: string, value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setCollapsed({id, value}));
  };

  static setAllCollapsed = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setAllCollapsed(value));
  };

  static addGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.addGroup(group));
  };

  static updateGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateGroup(group));
  };

  static removeGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeGroup(group));
  };

  static addItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.addItem(item));
  };

  static updateItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateItem(item));
  };

  static removeItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeItem(item));
  };
}

enum TYPES {
  FETCH_GROUPS = 'groups/fetchGroups',
  FETCH_ITEMS = 'groups/fetchItems',
  FETCH_MORE_ITEMS = 'groups/fetchMoreItems',
  DELETE_GROUP = 'groups/deleteGroup',
  LEAVE_GROUP = 'groups/leaveGroup',
  UPDATE_ORDER = 'groups/updateOrder',
}

export class GroupsThunks {
  static fetchGroups = createAsyncThunk(TYPES.FETCH_GROUPS, async (_, thunkAPI) => {
    const response = await ItemService.getAllGroups();
    const groupIds = response.data.map((g) => g.id);
    thunkAPI.dispatch(GroupsThunks.fetchItems(groupIds));
    return response.data;
  });

  static fetchItems = createAsyncThunk(TYPES.FETCH_ITEMS, async (groupIds: string[]) => {
    const response = await ItemService.getPreviewItemsByGroupIds(groupIds);
    return response.data;
  });

  static fetchMoreItems = createAsyncThunk(
    TYPES.FETCH_MORE_ITEMS,
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}) => {
      const response = await ItemService.getItemsByGroupId(groupId, offset, size);
      return response.data;
    },
  );

  static deleteGroup = createAsyncThunk(TYPES.DELETE_GROUP, async (group: Group, thunkAPI) => {
    await ItemService.deleteGroup(group.id);
    thunkAPI.dispatch(GroupsActions.removeGroup(group));
    thunkAPI.dispatch(SnackActions.handleCode('group.deleted', 'info'));
  });

  static leaveGroup = createAsyncThunk(TYPES.LEAVE_GROUP, async (group: Group, thunkAPI) => {
    await ItemService.leaveGroup(group.id);
    thunkAPI.dispatch(GroupsActions.removeGroup(group));
    thunkAPI.dispatch(SnackActions.handleCode('group.left', 'info'));
  });

  static updateOrder = createAsyncThunk(TYPES.UPDATE_ORDER, async (order: string[], thunkAPI) => {
    await ItemService.setGroupOrder(order);
    thunkAPI.dispatch(SnackActions.handleCode('group.sorted', 'info'));
  });
}
