import {AppDispatch} from '../store';
import {Item, ItemStatusType} from '../../models/Item';
import groupSlice from './groupSlice';
import {Group, GroupMember} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {GroupsActions} from '../groups/groupsActions';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import snackSlice from '../snack/snackSlice';
import groupsSlice from '../groups/groupsSlice';
import {InfoActions} from '../info/infoActions';

const PREFIX = 'group/';

export class GroupActions {
  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setGroup(group));
  };

  static fetchGroupThunk = createAsyncThunk(PREFIX + 'fetchGroup', async (groupId: string, thunkAPI) => {
    const response = await ItemService.getGroup(groupId);
    const groupUserIds = response.data.members.map((m) => m.userId);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(groupUserIds));
    return response.data;
  });

  static fetchActiveItemsThunk = createAsyncThunk(
    PREFIX + 'fetchActiveItems',
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}, thunkAPI) => {
      const response = await ItemService.getItemsByGroupId(groupId, offset, size);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static refreshActiveItemsThunk = createAsyncThunk(
    PREFIX + 'refreshActiveItems',
    async (groupId: string, thunkAPI) => {
      const response = await ItemService.getItemsByGroupId(groupId);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static fetchArchivedItemsThunk = createAsyncThunk(
    PREFIX + 'fetchArchivedItems',
    async ({groupId, offset, size}: {groupId: string; offset?: number; size?: number}, thunkAPI) => {
      const response = await ItemService.getArchivedItemsByGroupId(groupId, offset, size);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static refreshArchivedItemsThunk = createAsyncThunk(
    PREFIX + 'refreshArchivedItems',
    async (groupId: string, thunkAPI) => {
      const response = await ItemService.getArchivedItemsByGroupId(groupId);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static updateItemArchivedThunk = createAsyncThunk(PREFIX + 'updateItemArchived', async (item: Item, thunkAPI) => {
    const response = await ItemService.updateItemArchived(item.id, !item.archived);
    thunkAPI.dispatch(groupsSlice.actions.updateItem(response.data));
    thunkAPI.dispatch(groupSlice.actions.updateItemArchived(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.edited', variant: 'info'}));
  });

  static updateItemStatusThunk = createAsyncThunk(
    PREFIX + 'updateItemStatus',
    async ({item, status}: {item: Item; status: ItemStatusType}, thunkAPI) => {
      const response = await ItemService.updateItemStatus(item.id, status);
      thunkAPI.dispatch(groupsSlice.actions.updateItem(response.data));
      thunkAPI.dispatch(groupSlice.actions.updateItemStatus(response.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.edited', variant: 'info'}));
    },
  );

  static deleteItemThunk = createAsyncThunk(PREFIX + 'deleteItem', async (item: Item, thunkAPI) => {
    await ItemService.deleteItem(item.id);
    thunkAPI.dispatch(groupsSlice.actions.removeItem(item.id));
    thunkAPI.dispatch(groupSlice.actions.removeItem(item.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'item.deleted', variant: 'info'}));
  });

  static createGroupThunk = createAsyncThunk(PREFIX + 'createGroup', async (formData: FormData, thunkAPI) => {
    const response = await ItemService.createGroup(formData);
    thunkAPI.dispatch(groupsSlice.actions.addGroup(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.created', variant: 'info'}));
    thunkAPI.dispatch(GroupsActions.fetchItemsThunk([response.data.id]));
    return response.data;
  });

  static updateGroupThunk = createAsyncThunk(PREFIX + 'updateGroup', async (formData: FormData, thunkAPI) => {
    const response = await ItemService.updateGroup(formData);
    thunkAPI.dispatch(groupsSlice.actions.updateGroup(response.data));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    return response.data;
  });

  static addGroupMembersThunk = createAsyncThunk(
    PREFIX + 'addGroupMembers',
    async ({group, userIds}: {group: Group; userIds: string[]}, thunkAPI) => {
      const newMembers = userIds.map((userId) => ({userId: userId, permission: 'READ'} as GroupMember));
      const updatedMembers = [...group.members, ...newMembers];
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.addMembersToGroup(group.id, userIds);
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(groupSlice.actions.setGroup(updatedGroup));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    },
  );

  static editGroupMemberThunk = createAsyncThunk(
    PREFIX + 'editGroupMember',
    async ({group, member}: {group: Group; member: GroupMember}, thunkAPI) => {
      const updatedMembers = ArrayUtils.updateValueWithUserId(group.members, member);
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.editGroupMember(group.id, member);
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(groupSlice.actions.setGroup(updatedGroup));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    },
  );

  static removeGroupMembersThunk = createAsyncThunk(
    PREFIX + 'removeGroupMembers',
    async ({group, userIds}: {group: Group; userIds: string[]}, thunkAPI) => {
      const updatedMembers = group.members.filter((m) => !userIds.includes(m.userId));
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.removeMembersFromGroup(group.id, userIds);
      thunkAPI.dispatch(groupsSlice.actions.updateGroup(updatedGroup));
      thunkAPI.dispatch(groupSlice.actions.setGroup(updatedGroup));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'group.edited', variant: 'info'}));
    },
  );
}
