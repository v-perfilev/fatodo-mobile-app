import {AppDispatch} from '../store';
import {Item, ItemStatusType} from '../../models/Item';
import groupSlice from './groupSlice';
import {Group, GroupMember} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {GroupsActions, GroupsThunks} from '../groups/groupsActions';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {SnackActions} from '../snack/snackActions';

export class GroupActions {
  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setGroup(group));
  };

  static updateGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateGroup(group));
  };

  static addItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.addItem(item));
  };

  static updateItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItem(item));
  };

  static updaterItemArchived = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItemArchived(item));
  };

  static updaterItemStatus = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItemStatus(item));
  };

  static removeItem = (item: Item) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.removeItem(item));
  };
}

enum TYPES {
  FETCH_GROUP = 'group/fetchGroup',
  FETCH_ACTIVE_ITEMS = 'group/fetchActiveItems',
  FETCH_ARCHIVED_ITEMS = 'group/fetchArchivedItems',
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

  static updateItemArchived = createAsyncThunk(TYPES.UPDATE_ITEM_ARCHIVED, async (item: Item, thunkAPI) => {
    const response = await ItemService.updateItemArchived(item.id, !item.archived);
    thunkAPI.dispatch(GroupsActions.updateItem(response.data));
    thunkAPI.dispatch(GroupActions.updaterItemArchived(response.data));
    thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
  });

  static updateItemStatus = createAsyncThunk(
    TYPES.UPDATE_ITEM_STATUS,
    async ({item, status}: {item: Item; status: ItemStatusType}, thunkAPI) => {
      const response = await ItemService.updateItemStatus(item.id, status);
      thunkAPI.dispatch(GroupsActions.updateItem(response.data));
      thunkAPI.dispatch(GroupActions.updaterItemStatus(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('item.edited', 'info'));
    },
  );

  static deleteItem = createAsyncThunk(TYPES.DELETE_ITEM, async (item: Item, thunkAPI) => {
    await ItemService.deleteItem(item.id);
    thunkAPI.dispatch(GroupsActions.removeItem(item));
    thunkAPI.dispatch(GroupActions.removeItem(item));
    thunkAPI.dispatch(SnackActions.handleCode('item.deleted', 'info'));
  });

  static createGroup = createAsyncThunk(TYPES.CREATE_GROUP, async (formData: FormData, thunkAPI) => {
    const response = await ItemService.createGroup(formData);
    thunkAPI.dispatch(GroupsActions.addGroup(response.data));
    thunkAPI.dispatch(GroupsThunks.fetchItems([response.data.id]));
    thunkAPI.dispatch(SnackActions.handleCode('group.created', 'info'));
    return response.data;
  });

  static updateGroup = createAsyncThunk(TYPES.UPDATE_GROUP, async (formData: FormData, thunkAPI) => {
    const response = await ItemService.updateGroup(formData);
    thunkAPI.dispatch(GroupsActions.updateGroup(response.data));
    thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
    return response.data;
  });

  static addGroupMembers = createAsyncThunk(
    TYPES.ADD_GROUP_MEMBERS,
    async ({group, userIds}: {group: Group; userIds: string[]}, thunkAPI) => {
      const newMembers = userIds.map((userId) => ({id: userId, permission: 'READ'} as GroupMember));
      group.members = ArrayUtils.addValuesToEnd(group.members, newMembers);
      await ItemService.addMembersToGroup(group.id, userIds);
      thunkAPI.dispatch(GroupsActions.updateGroup(group));
      thunkAPI.dispatch(GroupActions.updateGroup(group));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
    },
  );

  static editGroupMember = createAsyncThunk(
    TYPES.EDIT_GROUP_MEMBER,
    async ({group, member}: {group: Group; member: GroupMember}, thunkAPI) => {
      group.members = ArrayUtils.updateValue(group.members, member);
      await ItemService.editGroupMember(group.id, member);
      thunkAPI.dispatch(GroupsActions.updateGroup(group));
      thunkAPI.dispatch(GroupActions.updateGroup(group));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
    },
  );

  static removeGroupMembers = createAsyncThunk(
    TYPES.REMOVE_GROUP_MEMBERS,
    async ({group, userIds}: {group: Group; userIds: string[]}, thunkAPI) => {
      group.members = group.members.filter((m) => !userIds.includes(m.id));
      await ItemService.removeMembersFromGroup(group.id, userIds);
      thunkAPI.dispatch(GroupsActions.updateGroup(group));
      thunkAPI.dispatch(GroupActions.updateGroup(group));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
    },
  );
}
