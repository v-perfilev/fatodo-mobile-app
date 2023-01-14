import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import NotificationService from '../../services/NotificationService';
import {ItemDTO} from '../../models/dto/ItemDTO';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {Item} from '../../models/Item';
import itemSlice from './itemSlice';
import {InfoActions} from '../info/infoActions';
import {Group} from '../../models/Group';
import {Reminder} from '../../models/Reminder';
import {SnackActions} from '../snack/snackActions';
import {GroupsActions} from '../groups/groupsActions';
import {GroupActions} from '../group/groupActions';
import {ListActions} from '../list/listActions';

const PREFIX = 'item/';

export class ItemActions {
  static afterLogout = () => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.reset());
  };

  static afterRefresh = () => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setShouldLoad(true));
  };

  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setGroup(group));
  };

  static removeGroup = (groupId: string) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.removeGroup(groupId));
  };

  static setItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setItem(item));
    dispatch(itemSlice.actions.setShouldLoad(false));
    dispatch(ItemActions.fetchRemindersThunk(item.id));
  };

  static removeItem = (groupId: string) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.removeItem(groupId));
  };

  static fetchItemThunk = createAsyncThunk<Item, string, AsyncThunkConfig>(
    PREFIX + 'fetchItem',
    async (itemId, thunkAPI) => {
      const response = await ItemService.getItem(itemId);
      const itemUserIds = [response.data.createdBy, response.data.lastModifiedBy];
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      await thunkAPI.dispatch(ItemActions.fetchRemindersThunk(itemId));
      await thunkAPI.dispatch(ItemActions.fetchGroupThunk(response.data.groupId));
      return response.data;
    },
  );

  static fetchItemAfterRestartThunk = createAsyncThunk<Item, string, AsyncThunkConfig>(
    PREFIX + 'fetchItemAfterRestart',
    async (itemId, thunkAPI) => {
      const response = await ItemService.getItem(itemId);
      const itemUserIds = [response.data.createdBy, response.data.lastModifiedBy];
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      await thunkAPI.dispatch(ItemActions.fetchRemindersThunk(itemId));
      await thunkAPI.dispatch(ItemActions.fetchGroupThunk(response.data.groupId));
      return response.data;
    },
  );

  static fetchGroupThunk = createAsyncThunk<Group, string, AsyncThunkConfig>(
    PREFIX + 'fetchGroup',
    async (groupId, thunkAPI) => {
      const response = await ItemService.getGroup(groupId);
      const groupUserIds = response.data.members.map((m) => m.userId);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(groupUserIds));
      return response.data;
    },
  );

  static fetchRemindersThunk = createAsyncThunk<Reminder[], string, AsyncThunkConfig>(
    PREFIX + 'fetchReminders',
    async (itemId) => {
      const response = await NotificationService.getAllByTargetId(itemId)
        .then((response) => response)
        .catch(() => ({data: []}));
      return response.data;
    },
  );

  static createItemThunk = createAsyncThunk<Item, {dto: ItemDTO; reminders: Reminder[]}, AsyncThunkConfig>(
    PREFIX + 'createItem',
    async ({dto}, thunkAPI) => {
      const response = await ItemService.createItem(dto);
      thunkAPI.dispatch(GroupsActions.addItem(response.data, true));
      thunkAPI.dispatch(GroupActions.addItem(response.data));
      thunkAPI.dispatch(ListActions.addItem(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('item.created', 'info'));
      return response.data;
    },
  );

  static updateItemThunk = createAsyncThunk<Item, {dto: ItemDTO; reminders: Reminder[]}, AsyncThunkConfig>(
    PREFIX + 'updateItem',
    async ({dto}, thunkAPI) => {
      const response = await ItemService.updateItem(dto);
      thunkAPI.dispatch(GroupsActions.updateItem(response.data));
      thunkAPI.dispatch(GroupActions.updateItem(response.data));
      thunkAPI.dispatch(ListActions.updateItem(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
      return response.data;
    },
  );

  static updateItemStatusThunk = createAsyncThunk<Item, Item, AsyncThunkConfig>(
    PREFIX + 'updateItemStatus',
    async (item, thunkAPI) => {
      const response = await ItemService.updateItemStatus(item.id, !item.done);
      thunkAPI.dispatch(GroupsActions.updateItem(response.data));
      thunkAPI.dispatch(GroupActions.updateItem(response.data));
      thunkAPI.dispatch(ListActions.updateItem(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
      return response.data;
    },
  );

  static updateItemArchivedThunk = createAsyncThunk<Item, Item, AsyncThunkConfig>(
    PREFIX + 'updateItemArchived',
    async (item, thunkAPI) => {
      const response = await ItemService.updateItemArchived(item.id, !item.archived);
      thunkAPI.dispatch(GroupsActions.updateItemArchived(response.data));
      thunkAPI.dispatch(GroupActions.updateItemArchived(response.data));
      thunkAPI.dispatch(ListActions.updateItem(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
      return response.data;
    },
  );

  static removeItemThunk = createAsyncThunk<string, Item, AsyncThunkConfig>(
    PREFIX + 'deleteItem',
    async (item, thunkAPI) => {
      await ItemService.deleteItem(item.id);
      thunkAPI.dispatch(GroupsActions.removeItem(item, true));
      thunkAPI.dispatch(GroupActions.removeItem(item.id));
      thunkAPI.dispatch(ListActions.removeItem(item.id));
      thunkAPI.dispatch(SnackActions.handleCode('item.deleted', 'info'));
      return item.id;
    },
  );
}
