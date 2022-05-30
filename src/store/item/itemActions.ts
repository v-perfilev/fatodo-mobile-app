import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import NotificationService from '../../services/NotificationService';
import {ItemDTO} from '../../models/dto/ItemDTO';
import {GroupsActions} from '../groups/groupsActions';
import {GroupActions, GroupThunks} from '../group/groupActions';
import {SnackActions} from '../snack/snackActions';
import {AppDispatch} from '../store';
import {Item} from '../../models/Item';
import itemSlice from './itemSlice';

export class ItemActions {
  static setItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setItem(item));
    dispatch(ItemThunks.fetchReminders(item.id));
  };
}

enum TYPES {
  FETCH_ITEM = 'item/fetchItem',
  FETCH_REMINDERS = 'item/fetchReminders',
  CREATE_ITEM = 'item/createItem',
  UPDATE_ITEM = 'item/updateItem',
}

export class ItemThunks {
  static fetchItem = createAsyncThunk(TYPES.FETCH_ITEM, async (itemId: string, thunkAPI) => {
    const response = await ItemService.getItem(itemId);
    thunkAPI.dispatch(GroupThunks.fetchGroup(response.data.groupId));
    thunkAPI.dispatch(ItemThunks.fetchReminders(itemId));
    return response.data;
  });

  static fetchReminders = createAsyncThunk(TYPES.FETCH_REMINDERS, async (itemId: string) => {
    const response = await NotificationService.getAllByTargetId(itemId);
    return response.data;
  });

  static createItem = createAsyncThunk(TYPES.CREATE_ITEM, async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.createItem(dto);
    thunkAPI.dispatch(GroupsActions.addItem(response.data));
    thunkAPI.dispatch(GroupActions.addItem(response.data));
    thunkAPI.dispatch(SnackActions.handleCode('item.created', 'info'));
    return response.data;
  });

  static updateItem = createAsyncThunk(TYPES.UPDATE_ITEM, async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.updateItem(dto);
    thunkAPI.dispatch(GroupsActions.updateItem(response.data));
    thunkAPI.dispatch(GroupActions.updateItem(response.data));
    thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
    return response.data;
  });
}
