import {AppDispatch, AsyncThunkConfig} from '../store';
import {Item} from '../../models/Item';
import groupSlice from './groupSlice';
import {Group, GroupMember} from '../../models/Group';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ItemService from '../../services/ItemService';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {InfoActions} from '../info/infoActions';
import {SnackActions} from '../snack/snackActions';
import {PageableList} from '../../models/PageableList';
import {GroupsActions} from '../groups/groupsActions';
import {ListActions} from '../list/listActions';

const PREFIX = 'group/';

export class GroupActions {
  static afterLogout = () => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.reset());
  };

  static afterRefresh = () => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setShouldLoad(true));
  };

  static resetActive = () => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.resetActiveItems());
  };

  static resetArchived = () => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.resetArchivedItems());
  };

  static setGroup = (group: Group) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setGroup(group));
    dispatch(groupSlice.actions.setShouldLoad(false));
  };

  static removeGroup = (groupId: string) => async (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.removeGroup(groupId));
  };

  static addMembers = (members: GroupMember[]) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setMembers(members));
  };

  static updateMembers = (members: GroupMember[]) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setMembers(members));
  };

  static removeMembers = (members: GroupMember[]) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.removeMembers(members));
  };

  static addItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setItem(item));
  };

  static updateItem = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.setItem(item));
  };

  static updateItemArchived = (item: Item) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.updateItemArchived(item));
  };

  static removeItem = (itemId: string) => (dispatch: AppDispatch) => {
    dispatch(groupSlice.actions.removeItem(itemId));
  };

  static fetchGroupThunk = createAsyncThunk<Group, string, AsyncThunkConfig>(
    PREFIX + 'fetchGroup',
    async (groupId, thunkAPI) => {
      const response = await ItemService.getGroup(groupId);
      const groupUserIds = response.data.members.map((m) => m.userId);
      thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk([response.data.id]));
      groupUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(groupUserIds));
      return response.data;
    },
  );

  static fetchGroupAfterRestartThunk = createAsyncThunk<Group, string, AsyncThunkConfig>(
    PREFIX + 'fetchGroupAfterRestart',
    async (groupId, thunkAPI) => {
      const response = await ItemService.getGroup(groupId);
      const groupUserIds = response.data.members.map((m) => m.userId);
      thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk([response.data.id]));
      groupUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(groupUserIds));
      return response.data;
    },
  );

  static fetchInitialActiveItemsThunk = createAsyncThunk<PageableList<Item>, {groupId: string}, AsyncThunkConfig>(
    PREFIX + 'fetchInitialActiveItems',
    async ({groupId}, thunkAPI) => {
      const response = await ItemService.getItemsByGroupId(groupId, 0);
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static fetchActiveItemsThunk = createAsyncThunk<
    PageableList<Item>,
    {groupId: string; offset?: number},
    AsyncThunkConfig
  >(PREFIX + 'fetchActiveItems', async ({groupId, offset}, thunkAPI) => {
    const response = await ItemService.getItemsByGroupId(groupId, offset);
    const itemIds = response.data.data.flatMap((i) => i.id);
    const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
    itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
    itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
    return response.data;
  });

  static refreshActiveItemsThunk = createAsyncThunk<PageableList<Item>, string, AsyncThunkConfig>(
    PREFIX + 'refreshActiveItems',
    async (groupId, thunkAPI) => {
      const response = await ItemService.getItemsByGroupId(groupId);
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static fetchInitialArchivedItemsThunk = createAsyncThunk<PageableList<Item>, {groupId: string}, AsyncThunkConfig>(
    PREFIX + 'fetchInitialArchivedItems',
    async ({groupId}, thunkAPI) => {
      const response = await ItemService.getArchivedItemsByGroupId(groupId, 0);
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static fetchArchivedItemsThunk = createAsyncThunk<
    PageableList<Item>,
    {groupId: string; offset?: number},
    AsyncThunkConfig
  >(PREFIX + 'fetchArchivedItems', async ({groupId, offset}, thunkAPI) => {
    const response = await ItemService.getArchivedItemsByGroupId(groupId, offset);
    const itemIds = response.data.data.flatMap((i) => i.id);
    const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
    itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
    itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
    return response.data;
  });

  static refreshArchivedItemsThunk = createAsyncThunk<PageableList<Item>, string, AsyncThunkConfig>(
    PREFIX + 'refreshArchivedItems',
    async (groupId, thunkAPI) => {
      const response = await ItemService.getArchivedItemsByGroupId(groupId);
      const itemIds = response.data.data.flatMap((i) => i.id);
      const itemUserIds = response.data.data.flatMap((i) => [i.createdBy, i.lastModifiedBy]);
      itemIds.length > 0 && thunkAPI.dispatch(InfoActions.handleCommentThreadIdsThunk(itemIds));
      itemUserIds.length > 0 && thunkAPI.dispatch(InfoActions.handleUserIdsThunk(itemUserIds));
      return response.data;
    },
  );

  static createGroupThunk = createAsyncThunk<Group, FormData, AsyncThunkConfig>(
    PREFIX + 'createGroup',
    async (formData, thunkAPI) => {
      const response = await ItemService.createGroup(formData);
      thunkAPI.dispatch(GroupsActions.createGroup(response.data));
      thunkAPI.dispatch(ListActions.addGroup(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('group.created', 'info'));
      return response.data;
    },
  );

  static updateGroupThunk = createAsyncThunk<Group, FormData, AsyncThunkConfig>(
    PREFIX + 'updateGroup',
    async (formData, thunkAPI) => {
      const response = await ItemService.updateGroup(formData);
      thunkAPI.dispatch(GroupsActions.updateGroup(response.data));
      thunkAPI.dispatch(ListActions.updateGroup(response.data));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
      return response.data;
    },
  );

  static addGroupMembersThunk = createAsyncThunk<Group, {group: Group; userIds: string[]}, AsyncThunkConfig>(
    PREFIX + 'addGroupMembers',
    async ({group, userIds}, thunkAPI) => {
      const newMembers = userIds.map((userId) => ({userId: userId, permission: 'READ'} as GroupMember));
      const updatedMembers = [...group.members, ...newMembers];
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.addMembersToGroup(group.id, userIds);
      thunkAPI.dispatch(GroupsActions.updateGroup(updatedGroup));
      thunkAPI.dispatch(ListActions.updateGroup(updatedGroup));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
      return updatedGroup;
    },
  );

  static editGroupMemberThunk = createAsyncThunk<Group, {group: Group; member: GroupMember}, AsyncThunkConfig>(
    PREFIX + 'editGroupMember',
    async ({group, member}, thunkAPI) => {
      const updatedMembers = ArrayUtils.updateValueWithUserId(group.members, member);
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.editGroupMember(group.id, member);
      thunkAPI.dispatch(GroupsActions.updateGroup(updatedGroup));
      thunkAPI.dispatch(ListActions.updateGroup(updatedGroup));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
      return updatedGroup;
    },
  );

  static removeGroupMembersThunk = createAsyncThunk<Group, {group: Group; userIds: string[]}, AsyncThunkConfig>(
    PREFIX + 'removeGroupMembers',
    async ({group, userIds}, thunkAPI) => {
      const updatedMembers = group.members.filter((m) => !userIds.includes(m.userId));
      const updatedGroup = {...group, members: updatedMembers};
      await ItemService.removeMembersFromGroup(group.id, userIds);
      thunkAPI.dispatch(GroupsActions.updateGroup(updatedGroup));
      thunkAPI.dispatch(ListActions.updateGroup(updatedGroup));
      thunkAPI.dispatch(SnackActions.handleCode('group.edited', 'info'));
      return updatedGroup;
    },
  );

  static removeGroupThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'deleteGroup',
    async (groupId, thunkAPI) => {
      await ItemService.deleteGroup(groupId);
      thunkAPI.dispatch(GroupsActions.removeGroup(groupId));
      thunkAPI.dispatch(ListActions.removeGroup(groupId));
      thunkAPI.dispatch(SnackActions.handleCode('group.deleted', 'info'));
      return groupId;
    },
  );

  static leaveGroupThunk = createAsyncThunk<string, string, AsyncThunkConfig>(
    PREFIX + 'leaveGroup',
    async (groupId, thunkAPI) => {
      await ItemService.leaveGroup(groupId);
      thunkAPI.dispatch(GroupsActions.removeGroup(groupId));
      thunkAPI.dispatch(ListActions.removeGroup(groupId));
      thunkAPI.dispatch(SnackActions.handleCode('group.left', 'info'));
      return groupId;
    },
  );
}
