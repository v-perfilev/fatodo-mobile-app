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
import {InfoThunks} from '../info/infoActions';
import {Group} from '../../models/Group';

export class ItemActions {
  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setGroup(group));
  };

  static setItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setItem(item));
    dispatch(ItemThunks.fetchReminders(item.id));
  };
}

enum TYPES {
  FETCH_ITEM = 'item/fetchItem',
  FETCH_GROUP = 'item/fetchGroup',
  FETCH_REMINDERS = 'item/fetchReminders',
  CREATE_ITEM = 'item/createItem',
  UPDATE_ITEM = 'item/updateItem',
}

export class ItemThunks {
  static fetchItem = createAsyncThunk(TYPES.FETCH_ITEM, async (itemId: string, thunkAPI) => {
    const response = await ItemService.getItem(itemId);
    const itemUserIds = [response.data.createdBy, response.data.lastModifiedBy];
    thunkAPI.dispatch(InfoThunks.handleUserIds(itemUserIds));
    await thunkAPI.dispatch(ItemThunks.fetchGroup(response.data.groupId));
    await thunkAPI.dispatch(ItemThunks.fetchReminders(itemId));
    return response.data;
  });

  static fetchGroup = createAsyncThunk(TYPES.FETCH_GROUP, async (groupId: string, thunkAPI) => {
    const response = await ItemService.getGroup(groupId);
    const groupUserIds = response.data.members.map((m) => m.userId);
    thunkAPI.dispatch(InfoThunks.handleUserIds(groupUserIds));
    return response.data;
  });

  static fetchReminders = createAsyncThunk(TYPES.FETCH_REMINDERS, async (itemId: string) => {
    const response = await NotificationService.getAllByTargetId(itemId);
    return response.data;
  });

  static createItem = createAsyncThunk(TYPES.CREATE_ITEM, async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.createItem(dto);
    thunkAPI.dispatch(groupsSlice.actions.addItem(response.data));
    thunkAPI.dispatch(groupSlice.actions.addItem(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.created', variant: 'info'}));
    return response.data;
  });

  static updateItem = createAsyncThunk(TYPES.UPDATE_ITEM, async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.updateItem(dto);
    thunkAPI.dispatch(groupsSlice.actions.updateItem(response.data));
    thunkAPI.dispatch(groupSlice.actions.updateItem(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.edited', variant: 'info'}));
    return response.data;
  });
}
