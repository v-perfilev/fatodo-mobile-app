import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';

enum TYPES {
  FETCH_GROUPS = 'groups/fetchGroups',
  FETCH_ITEMS = 'groups/fetchItems',
  FETCH_MORE_ITEMS = 'groups/fetchMoreItems',
  DELETE_GROUP = 'groups/deleteGroup',
}

export class GroupsThunks {
  static fetchGroups = createAsyncThunk(TYPES.FETCH_GROUPS, async () => {
    const response = await ItemService.getAllGroups();
    return response.data;
  });

  static fetchItems = createAsyncThunk(TYPES.FETCH_ITEMS, async (groupIds: string[]) => {
    const response = await ItemService.getPreviewItemsByGroupIds(groupIds);
    return response.data;
  });

  static fetchMoreItems = createAsyncThunk(
    TYPES.FETCH_MORE_ITEMS,
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}) => {
      const response = await ItemService.getItemsByGroupId(groupId, offset, size);
      return response.data;
    },
  );

  static deleteGroup = createAsyncThunk(TYPES.DELETE_GROUP, async (groupId: string) => {
    const response = await ItemService.deleteGroup(groupId);
    return response.data;
  });
}

export default GroupsThunks;
