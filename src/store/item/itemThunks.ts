import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import NotificationService from '../../services/NotificationService';
import {ItemDTO} from '../../models/dto/ItemDTO';
import GroupActions from '../group/groupActions';
import GroupsActions from '../groups/groupsActions';
import GroupThunks from '../group/groupThunks';

enum TYPES {
  FETCH_ITEM = 'item/fetchItem',
  FETCH_REMINDERS = 'item/fetchReminders',
  CREATE_ITEM = 'item/createItem',
  UPDATE_ITEM = 'item/updateItem',
}

export class ItemThunks {
  static fetchItem = createAsyncThunk(TYPES.FETCH_ITEM, async (itemId: string, thunkAPI) => {
    const response = await ItemService.getItem(itemId);
    thunkAPI.dispatch(ItemThunks.fetchReminders(itemId));
    thunkAPI.dispatch(GroupThunks.fetchGroup(response.data.groupId));
    return response.data;
  });

  static fetchReminders = createAsyncThunk(TYPES.FETCH_REMINDERS, async (itemId: string) => {
    const response = await NotificationService.getAllByTargetId(itemId);
    return response.data;
  });

  static createItem = createAsyncThunk(TYPES.CREATE_ITEM, async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.createItem(dto);
    thunkAPI.dispatch(GroupsActions.createItem(response.data));
    thunkAPI.dispatch(GroupActions.createItem(response.data));
    return response.data;
  });

  static updateItem = createAsyncThunk(TYPES.UPDATE_ITEM, async (dto: ItemDTO, thunkAPI) => {
    const response = await ItemService.updateItem(dto);
    thunkAPI.dispatch(GroupsActions.updateItem(response.data));
    thunkAPI.dispatch(GroupActions.updaterItem(response.data));
    return response.data;
  });
}

export default ItemThunks;
