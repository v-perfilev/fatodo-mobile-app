import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {Item, ItemStatusType} from '../../models/Item';

enum TYPES {
  FETCH_GROUP = 'group/fetchGroup',
  FETCH_ACTIVE_ITEMS = 'group/fetchActiveItems',
  FETCH_ARCHIVED_ITEMS = 'group/fetchArchivedItems',
  UPDATE_ITEM_ARCHIVED = 'group/updateItemArchived',
  UPDATE_ITEM_STATUS = 'group/updateItemStatus',
  DELETE_ITEM = 'group/removeItem',
  CREATE_GROUP = 'group/createGroup',
  UPDATE_GROUP = 'group/updateGroup',
}

export class GroupThunks {
  static fetchGroup = createAsyncThunk(TYPES.FETCH_GROUP, async (groupId: string) => {
    const response = await ItemService.getGroup(groupId);
    return response.data;
  });

  static fetchActiveItems = createAsyncThunk(
    TYPES.FETCH_ACTIVE_ITEMS,
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}) => {
      const response = await ItemService.getItemsByGroupId(groupId, offset, size);
      return response.data;
    },
  );

  static fetchArchivedItems = createAsyncThunk(
    TYPES.FETCH_ARCHIVED_ITEMS,
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}) => {
      const response = await ItemService.getArchivedItemsByGroupId(groupId, offset, size);
      return response.data;
    },
  );

  static updateItemArchived = createAsyncThunk(TYPES.UPDATE_ITEM_ARCHIVED, async (item: Item) => {
    const response = await ItemService.updateItemArchived(item.id, !item.archived);
    return response.data;
  });

  static updateItemStatus = createAsyncThunk(
    TYPES.UPDATE_ITEM_STATUS,
    async ({item, status}: {item: Item; status: ItemStatusType}) => {
      const response = await ItemService.updateItemStatus(item.id, status);
      return response.data;
    },
  );

  static deleteItem = createAsyncThunk(TYPES.DELETE_ITEM, async (item: Item) => {
    const response = await ItemService.deleteItem(item.id);
    return response.data;
  });

  static createGroup = createAsyncThunk(TYPES.CREATE_GROUP, async (formData: FormData) => {
    const response = await ItemService.createGroup(formData);
    return response.data;
  });

  static updateGroup = createAsyncThunk(TYPES.UPDATE_GROUP, async (formData: FormData) => {
    const response = await ItemService.updateGroup(formData);
    return response.data;
  });
}

export default GroupThunks;
