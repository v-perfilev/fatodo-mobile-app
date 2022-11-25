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

const PREFIX = 'item/';

export class ItemActions {
  static reset = () => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.reset());
  };

  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setGroup(group));
  };

  static setItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setItem(item));
    dispatch(ItemActions.fetchRemindersThunk(item.id));
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
      thunkAPI.dispatch(GroupsActions.addItem(response.data));
      thunkAPI.dispatch(GroupActions.addItem(response.data));
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
      thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
      return response.data;
    },
  );
}
