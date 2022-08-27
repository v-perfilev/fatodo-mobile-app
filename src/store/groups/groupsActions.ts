import {AppDispatch} from '../store';
import groupsSlice from './groupsSlice';
import {Group} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import snackSlice from '../snack/snackSlice';
import {InfoActions} from '../info/infoActions';
import eventsSlice from '../events/eventsSlice';

const PREFIX = 'groups/';

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

  static fetchGroupsThunk = createAsyncThunk(PREFIX + 'fetchGroups', async (_, thunkAPI) => {
    const response = await ItemService.getAllGroups();
    const groupIds = response.data.map((g) => g.id);
    groupIds.length > 0 && thunkAPI.dispatch(GroupsActions.fetchItemsThunk(groupIds));
    const groupUserIds = response.data.flatMap((g) => g.members).map((m) => m.userId);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(groupUserIds));
    return response.data;
  });

  static fetchItemsThunk = createAsyncThunk(PREFIX + 'fetchItems', async (groupIds: string[], thunkAPI) => {
    const response = await ItemService.getPreviewItemsByGroupIds(groupIds);
    const pageableListMap = new Map(Object.entries(response.data));
    const itemUserIds = Array.from(pageableListMap.values())
      .flatMap((g) => g.data)
      .flatMap((i) => [i.createdBy, i.lastModifiedBy]);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
    return response.data;
  });

  static deleteGroupThunk = createAsyncThunk(PREFIX + 'deleteGroup', async (group: Group, thunkAPI) => {
    await ItemService.deleteGroup(group.id);
    thunkAPI.dispatch(groupsSlice.actions.removeGroup(group.id));
    thunkAPI.dispatch(eventsSlice.actions.removeGroupEvents(group.id));
    thunkAPI.dispatch(eventsSlice.actions.removeCommentEvents(group.id));
    thunkAPI.dispatch(eventsSlice.actions.removeReminderEventsByGroupId(group.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.deleted', variant: 'info'}));
  });

  static leaveGroupThunk = createAsyncThunk(PREFIX + 'leaveGroup', async (group: Group, thunkAPI) => {
    await ItemService.leaveGroup(group.id);
    thunkAPI.dispatch(groupsSlice.actions.removeGroup(group.id));
    thunkAPI.dispatch(eventsSlice.actions.removeGroupEvents(group.id));
    thunkAPI.dispatch(eventsSlice.actions.removeCommentEvents(group.id));
    thunkAPI.dispatch(eventsSlice.actions.removeReminderEventsByGroupId(group.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.left', variant: 'info'}));
  });

  static updateOrderThunk = createAsyncThunk(PREFIX + 'updateOrder', async (order: string[], thunkAPI) => {
    await ItemService.setGroupOrder(order);
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.sorted', variant: 'info'}));
  });
}
