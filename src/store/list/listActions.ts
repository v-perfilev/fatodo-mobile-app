import {AppDispatch, AsyncThunkConfig} from '../store';
import {Item} from '../../models/Item';
import listSlice from './listSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {InfoActions} from '../info/infoActions';
import {PageableList} from '../../models/PageableList';
import {Group} from '../../models/Group';
import groupsSlice from '../groups/groupsSlice';

const PREFIX = 'list/';

export class ListActions {
  static afterLogout = () => async (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.reset());
  };

  static afterRefresh = () => async (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.setShouldLoad(true));
  };

  static resetItems = () => async (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.resetItems());
  };

  static addGroup = (group: Group) => (dispatch: AppDispatch) => {
    const memberIds = group.members.map((m) => m.userId);
    dispatch(groupsSlice.actions.addGroup(group));
    dispatch(InfoActions.handleUserIdsThunk(memberIds));
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

  static removeItem = (itemId: string) => (dispatch: AppDispatch) => {
    dispatch(listSlice.actions.removeItem(itemId));
  };

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

  static fetchInitialItemsThunk = createAsyncThunk<PageableList<Item>, void, AsyncThunkConfig>(
    PREFIX + 'fetchInitialItems',
    async (_, thunkAPI) => {
      const response = await ItemService.getItemList(0);
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
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
