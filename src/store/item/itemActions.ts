import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import NotificationService from '../../services/NotificationService';
import {ItemDTO} from '../../models/dto/ItemDTO';
import {AppDispatch} from '../store';
import {Item} from '../../models/Item';
import itemSlice from './itemSlice';
import snackSlice from '../snack/snackSlice';
import groupsSlice from '../groups/groupsSlice';
import groupSlice from '../group/groupSlice';
import {InfoActions} from '../info/infoActions';
import {Group} from '../../models/Group';

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

  static fetchItemThunk = createAsyncThunk(PREFIX + 'fetchItem', async (itemId: string, thunkAPI) => {
    thunkAPI.dispatch(itemSlice.actions.reset());
    const response = await ItemService.getItem(itemId);
    const itemUserIds = [response.data.createdBy, response.data.lastModifiedBy];
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
    await thunkAPI.dispatch(ItemActions.fetchGroupThunk(response.data.groupId));
    await thunkAPI.dispatch(ItemActions.fetchRemindersThunk(itemId));
    return response.data;
  });

  static fetchGroupThunk = createAsyncThunk(PREFIX + 'fetchGroup', async (groupId: string, thunkAPI) => {
    const response = await ItemService.getGroup(groupId);
    const groupUserIds = response.data.members.map((m) => m.userId);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(groupUserIds));
    return response.data;
  });

  static fetchRemindersThunk = createAsyncThunk(PREFIX + 'fetchReminders', async (itemId: string) => {
    const response = await NotificationService.getAllByTargetId(itemId);
    return response.data;
  });

  static createItemThunk = createAsyncThunk(PREFIX + 'createItem', async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.createItem(dto);
    thunkAPI.dispatch(groupsSlice.actions.addItem(response.data));
    thunkAPI.dispatch(groupSlice.actions.addItem(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.created', variant: 'info'}));
    return response.data;
  });

  static updateItemThunk = createAsyncThunk(PREFIX + 'updateItem', async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.updateItem(dto);
    thunkAPI.dispatch(groupsSlice.actions.updateItem(response.data));
    thunkAPI.dispatch(groupSlice.actions.updateItem(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.edited', variant: 'info'}));
    return response.data;
  });
}
