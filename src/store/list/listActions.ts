import {AppDispatch, AsyncThunkConfig} from '../store';
import {Item} from '../../models/Item';
import listSlice from './listSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {InfoActions} from '../info/infoActions';
import {PageableList} from '../../models/PageableList';
import {Group} from '../../models/Group';

const PREFIX = 'list/';

export class ListActions {
  static afterLogout = () => async (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.reset());
  };

  static afterRefresh = () => async (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.setShouldLoad(true));
  };

  static addGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.addGroup(group));
    dispatch(listSlice.actions.setShouldLoad(true));
  };

  static updateGroup = (group: Group) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.updateGroup(group));
  };

  static removeGroup = (groupId: string) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.removeGroup(groupId));
    dispatch(listSlice.actions.removeItems(groupId));
  };

  static addItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.setItem(item));
  };

  static updateItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.setItem(item));
  };

  static updateItemArchived = (item: Item) => (dispatch: AppDispatch) => {
    if (item.archived) {
      dispatch(listSlice.actions.removeItem(item.id));
    } else {
      dispatch(listSlice.actions.setItem(item));
    }
  };

  static removeItem = (itemId: string) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.removeItem(itemId));
  };

  static fetchGroupThunk = createAsyncThunk<Group, string, AsyncThunkConfig>(PREFIX + 'fetchGroup', async (groupId) => {
    const response = await ItemService.getGroup(groupId);
    return response.data;
  });

  static fetchGroupsThunk = createAsyncThunk<Group[], void, AsyncThunkConfig>(
    PREFIX + 'fetchGroups',
    async (_, thunkAPI) => {
      const response = await ItemService.getAllGroups();
      const memberIds = response.data.data.flatMap((g) => g.members).map((m) => m.userId);
      if (memberIds.length > 0) {
        thunkAPI.dispatch(InfoActions.handleUserIdsThunk(memberIds));
      }
      return response.data.data;
    },
  );

  static fetchItemsThunk = createAsyncThunk<PageableList<Item>, {offset?: number}, AsyncThunkConfig>(
    PREFIX + 'fetchItems',
    async ({offset}, thunkAPI) => {
      const response = await ItemService.getItemList(offset);
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static refreshItemsThunk = createAsyncThunk<PageableList<Item>, void, AsyncThunkConfig>(
    PREFIX + 'refreshItems',
    async (_, thunkAPI) => {
      const response = await ItemService.getItemList();
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );
}
