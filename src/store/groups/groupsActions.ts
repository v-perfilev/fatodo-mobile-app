import {AppDispatch, AsyncThunkConfig} from '../store';
import groupsSlice from './groupsSlice';
import {Group, GroupMember} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {InfoActions} from '../info/infoActions';
import {Item} from '../../models/Item';
import {SnackActions} from '../snack/snackActions';
import {PageableList} from '../../models/PageableList';
import calendarSlice from '../calendar/calendarSlice';

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

  static addGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.addGroup(group));
  };

  static updateGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateGroup(group));
  };

  static removeGroup = (groupId: string) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeGroup(groupId));
    dispatch(groupsSlice.actions.removeItems(groupId));
    dispatch(groupsSlice.actions.removeItemsCount(groupId));
    dispatch(groupsSlice.actions.removeItemsLoading(groupId));
    dispatch(groupsSlice.actions.removeCollapsed(groupId));
    dispatch(calendarSlice.actions.reset());
  };

  static addMembers = (members: GroupMember[]) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setMembers(members));
  };

  static updateMembers = (members: GroupMember[]) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setMembers(members));
  };

  static removeMembers = (members: GroupMember[]) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeMembers(members));
  };

  static addItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.addItem(item));
    dispatch(groupsSlice.actions.incrementItemsCount(item.groupId));
    dispatch(calendarSlice.actions.reset());
  };

  static updateItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.updateItem(item));
    dispatch(calendarSlice.actions.reset());
  };

  static updateItemArchived = (item: Item) => (dispatch: AppDispatch) => {
    if (item.archived) {
      dispatch(groupsSlice.actions.removeItem(item));
      dispatch(groupsSlice.actions.decrementItemsCount(item.groupId));
    } else {
      dispatch(groupsSlice.actions.addItem(item));
      dispatch(groupsSlice.actions.incrementItemsCount(item.groupId));
    }
  };

  static removeItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.removeItem(item));
    dispatch(groupsSlice.actions.decrementItemsCount(item.groupId));
    dispatch(calendarSlice.actions.reset());
  };

  static setCollapsed = (groupId: string, value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setCollapsed([groupId, value]));
  };

  static setAllCollapsed = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(groupsSlice.actions.setAllCollapsed(value));
  };

  static fetchGroupThunk = createAsyncThunk<Group, string, AsyncThunkConfig>(
    PREFIX + 'fetchGroup',
    async (groupId, thunkAPI) => {
      const response = await ItemService.getGroup(groupId);
      const memberIds = response.data.members.map((m) => m.userId);
      thunkAPI.dispatch(GroupsActions.fetchItemsThunk([groupId]));
      thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk([groupId]));
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(memberIds));
      thunkAPI.dispatch(calendarSlice.actions.reset());
      return response.data;
    },
  );

  static fetchGroupsThunk = createAsyncThunk<Group[], void, AsyncThunkConfig>(
    PREFIX + 'fetchGroups',
    async (_, thunkAPI) => {
      const response = await ItemService.getAllGroups();
      const groupIds = response.data.data.map((g) => g.id);
      const memberIds = response.data.data.flatMap((g) => g.members).map((m) => m.userId);
      groupIds.length > 0 && thunkAPI.dispatch(GroupsActions.fetchItemsThunk(groupIds));
      groupIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(groupIds));
      memberIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(memberIds));
      return response.data.data;
    },
  );

  static fetchItemsThunk = createAsyncThunk<[string, PageableList<Item>][], string[], AsyncThunkConfig>(
    PREFIX + 'fetchItems',
    async (groupIds, thunkAPI) => {
      const response = await ItemService.getPreviewItemsByGroupIds(groupIds);
      const itemIds = response.data
        .map((entry) => entry[1])
        .flatMap((g) => g.data)
        .map((i) => i.id);
      const itemUserIds = response.data
        .map((entry) => entry[1])
        .flatMap((g) => g.data)
        .flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      thunkAPI.dispatch(calendarSlice.actions.reset());
      return response.data;
    },
  );

  static removeGroupThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'deleteGroup',
    async (groupId, thunkAPI) => {
      await ItemService.deleteGroup(groupId);
      thunkAPI.dispatch(SnackActions.handleCode('group.deleted', 'info'));
      thunkAPI.dispatch(calendarSlice.actions.reset());
      return groupId;
    },
  );

  static leaveGroupThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'leaveGroup',
    async (groupId, thunkAPI) => {
      await ItemService.leaveGroup(groupId);
      thunkAPI.dispatch(SnackActions.handleCode('group.left', 'info'));
      thunkAPI.dispatch(calendarSlice.actions.reset());
      return groupId;
    },
  );

  static updateOrderThunk = createAsyncThunk<void, string[], AsyncThunkConfig>(
    PREFIX + 'updateOrder',
    async (order, thunkAPI) => {
      await ItemService.setGroupOrder(order);
      thunkAPI.dispatch(SnackActions.handleCode('group.sorted', 'info'));
    },
  );
}
