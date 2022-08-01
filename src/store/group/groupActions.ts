import {AppDispatch} from '../store';
import {Item, ItemStatusType} from '../../models/Item';
import groupSlice from './groupSlice';
import {Group, GroupMember} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {GroupsThunks} from '../groups/groupsActions';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import snackSlice from '../snack/snackSlice';
import groupsSlice from '../groups/groupsSlice';
import {InfoThunks} from '../info/infoActions';

export class GroupActions {
  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setGroup(group));
  };
}

enum TYPES {
  FETCH_GROUP = 'group/fetchGroup',
  FETCH_ACTIVE_ITEMS = 'group/fetchActiveItems',
  REFRESH_ACTIVE_ITEMS = 'group/refreshActiveItems',
  FETCH_ARCHIVED_ITEMS = 'group/fetchArchivedItems',
  REFRESH_ARCHIVED_ITEMS = 'group/refreshArchivedItems',
  UPDATE_ITEM_ARCHIVED = 'group/updateItemArchived',
  UPDATE_ITEM_STATUS = 'group/updateItemStatus',
  DELETE_ITEM = 'group/removeItem',
  CREATE_GROUP = 'group/createGroup',
  UPDATE_GROUP = 'group/updateGroup',
  ADD_GROUP_MEMBERS = 'group/addGroupMember',
  EDIT_GROUP_MEMBER = 'group/editGroupMember',
  REMOVE_GROUP_MEMBERS = 'group/deleteGroupMember',
}

export class GroupThunks {
  static fetchGroup = createAsyncThunk(TYPES.FETCH_GROUP, async (groupId: string, thunkAPI) => {
    const response = await ItemService.getGroup(groupId);
    const groupUserIds = response.data.members.map((m) => m.userId);
    thunkAPI.dispatch(InfoThunks.handleUserIds(groupUserIds));
    return response.data;
  });

  static fetchActiveItems = createAsyncThunk(
    TYPES.FETCH_ACTIVE_ITEMS,
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}, thunkAPI) => {
      const response = await ItemService.getItemsByGroupId(groupId, offset, size);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      thunkAPI.dispatch(InfoThunks.handleUserIds(itemUserIds));
      return response.data;
    },
  );

  static refreshActiveItems = createAsyncThunk(TYPES.REFRESH_ACTIVE_ITEMS, async (groupId: string, thunkAPI) => {
    thunkAPI.dispatch(GroupThunks.fetchActiveItems({groupId}));
  });

  static fetchArchivedItems = createAsyncThunk(
    TYPES.FETCH_ARCHIVED_ITEMS,
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}, thunkAPI) => {
      const response = await ItemService.getArchivedItemsByGroupId(groupId, offset, size);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      thunkAPI.dispatch(InfoThunks.handleUserIds(itemUserIds));
      return response.data;
    },
  );

  static refreshArchivedItems = createAsyncThunk(TYPES.REFRESH_ARCHIVED_ITEMS, async (groupId: string, thunkAPI) => {
    thunkAPI.dispatch(GroupThunks.fetchArchivedItems({groupId}));
  });

  static updateItemArchived = createAsyncThunk(TYPES.UPDATE_ITEM_ARCHIVED, async (item: Item, thunkAPI) => {
    const response = await ItemService.updateItemArchived(item.id, !item.archived);
    thunkAPI.dispatch(groupsSlice.actions.updateItem(response.data));
    thunkAPI.dispatch(groupSlice.actions.updateItemArchived(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.edited', variant: 'info'}));
  });

  static updateItemStatus = createAsyncThunk(
    TYPES.UPDATE_ITEM_STATUS,
    async ({item, status}: {item: Item; status: ItemStatusType}, thunkAPI) => {
      const response = await ItemService.updateItemStatus(item.id, status);
      thunkAPI.dispatch(groupsSlice.actions.updateItem(response.data));
      thunkAPI.dispatch(groupSlice.actions.updateItemStatus(response.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.edited', variant: 'info'}));
    },
  );

  static deleteItem = createAsyncThunk(TYPES.DELETE_ITEM, async (item: Item, thunkAPI) => {
    await ItemService.deleteItem(item.id);
    thunkAPI.dispatch(groupsSlice.actions.removeItem(item.id));
    thunkAPI.dispatch(groupSlice.actions.removeItem(item.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.deleted', variant: 'info'}));
  });

  static createGroup = createAsyncThunk(TYPES.CREATE_GROUP, async (formData: FormData, thunkAPI) => {
    const response = await ItemService.createGroup(formData);
    thunkAPI.dispatch(groupsSlice.actions.addGroup(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.created', variant: 'info'}));
    thunkAPI.dispatch(GroupsThunks.fetchItems([response.data.id]));
    return response.data;
  });

  static updateGroup = createAsyncThunk(TYPES.UPDATE_GROUP, async (formData: FormData, thunkAPI) => {
    const response = await ItemService.updateGroup(formData);
    thunkAPI.dispatch(groupsSlice.actions.updateGroup(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    return response.data;
  });

  static addGroupMembers = createAsyncThunk(
    TYPES.ADD_GROUP_MEMBERS,
    async ({group, userIds}: {group: Group; userIds: string[]}, thunkAPI) => {
      const newMembers = userIds.map((userId) => ({userId: userId, permission: 'READ'} as GroupMember));
      const updatedMembers = [...group.members, ...newMembers];
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.addMembersToGroup(group.id, userIds);
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(groupSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    },
  );

  static editGroupMember = createAsyncThunk(
    TYPES.EDIT_GROUP_MEMBER,
    async ({group, member}: {group: Group; member: GroupMember}, thunkAPI) => {
      const updatedMembers = ArrayUtils.updateValueWithUserId(group.members, member);
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.editGroupMember(group.id, member);
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    },
  );

  static removeGroupMembers = createAsyncThunk(
    TYPES.REMOVE_GROUP_MEMBERS,
    async ({group, userIds}: {group: Group; userIds: string[]}, thunkAPI) => {
      const updatedMembers = group.members.filter((m) => !userIds.includes(m.userId));
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.removeMembersFromGroup(group.id, userIds);
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    },
  );
}
