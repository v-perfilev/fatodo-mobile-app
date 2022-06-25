import {AppDispatch} from '../store';
import groupsSlice from './groupsSlice';
import {Group} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import snackSlice from '../snack/snackSlice';

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

  static setCollapsed = (groupId: string, value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setCollapsed({groupId, value}));
  };

  static setAllCollapsed = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setAllCollapsed(value));
  };
}

enum TYPES {
  FETCH_GROUPS = 'groups/fetchGroups',
  REFRESH_GROUPS = 'groups/refreshGroups',
  FETCH_ITEMS = 'groups/fetchItems',
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

  static refreshGroups = createAsyncThunk(TYPES.REFRESH_GROUPS, async (_, thunkAPI) => {
    const response = await ItemService.getAllGroups();
    const groupIds = response.data.map((g) => g.id);
    thunkAPI.dispatch(GroupsThunks.fetchItems(groupIds));
    return response.data;
  });

  static fetchItems = createAsyncThunk(TYPES.FETCH_ITEMS, async (groupIds: string[]) => {
    const response = await ItemService.getPreviewItemsByGroupIds(groupIds);
    return response.data;
  });

  static deleteGroup = createAsyncThunk(TYPES.DELETE_GROUP, async (group: Group, thunkAPI) => {
    await ItemService.deleteGroup(group.id);
    thunkAPI.dispatch(groupsSlice.actions.removeGroup(group));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.deleted', variant: 'info'}));
  });

  static leaveGroup = createAsyncThunk(TYPES.LEAVE_GROUP, async (group: Group, thunkAPI) => {
    await ItemService.leaveGroup(group.id);
    thunkAPI.dispatch(groupsSlice.actions.removeGroup(group));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.left', variant: 'info'}));
  });

  static updateOrder = createAsyncThunk(TYPES.UPDATE_ORDER, async (order: string[], thunkAPI) => {
    await ItemService.setGroupOrder(order);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.sorted', variant: 'info'}));
  });
}
