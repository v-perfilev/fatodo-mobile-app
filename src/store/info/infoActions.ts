import {AppDispatch, RootState} from '../store';
import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../../services/UserService';
import infoSlice from './infoSlice';
import {InfoUtils} from '../../shared/utils/InfoUtils';
import ItemService from '../../services/ItemService';
import ChatService from '../../services/ChatService';
import CommentService from '../../services/CommentService';

const PREFIX = 'info/';

export class InfoActions {
  static handleUsers = (users: User[]) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.handleUsers(users));
  };

  /*
  Users
  */
  static handleUserIdsThunk = createAsyncThunk(PREFIX + 'handleUserIds', async (ids: string[], thunkAPI) => {
    const {users, loadingUserIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, users, loadingUserIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoActions.fetchUsersThunk(idsToLoad));
  });

  static fetchUsersThunk = createAsyncThunk(PREFIX + 'fetchUsers', async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, UserService.getAllByIds);
  });

  /*
  Groups
  */
  static handleGroupIdsThunk = createAsyncThunk(PREFIX + 'handleGroupIds', async (ids: string[], thunkAPI) => {
    const {groups, loadingGroupIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, groups, loadingGroupIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoActions.fetchGroupsThunk(idsToLoad));
  });

  static fetchGroupsThunk = createAsyncThunk(PREFIX + 'fetchGroups', async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ItemService.getGroupInfoByIds);
  });

  /*
  Items
  */
  static handleItemIdsThunk = createAsyncThunk(PREFIX + 'handleItemIds', async (ids: string[], thunkAPI) => {
    const {items, loadingItemIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, items, loadingItemIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoActions.fetchItemsThunk(idsToLoad));
  });

  static fetchItemsThunk = createAsyncThunk(PREFIX + 'fetchItems', async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ItemService.getItemInfoByIds);
  });

  /*
  Chats
  */
  static handleChatIdsThunk = createAsyncThunk(PREFIX + 'handleChatIds', async (ids: string[], thunkAPI) => {
    const {chats, loadingChatIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, chats, loadingChatIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoActions.fetchChatsThunk(idsToLoad));
  });

  static fetchChatsThunk = createAsyncThunk(PREFIX + 'fetchChats', async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ChatService.getChatInfoByIds);
  });

  /*
  Messages
  */
  static handleMessageIdsThunk = createAsyncThunk(PREFIX + 'handleMessageIds', async (ids: string[], thunkAPI) => {
    const {messages, loadingMessageIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, messages, loadingMessageIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoActions.fetchMessagesThunk(idsToLoad));
  });

  static fetchMessagesThunk = createAsyncThunk(PREFIX + 'fetchMessages', async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ChatService.getMessageInfoByIds);
  });

  /*
  Comments
  */
  static handleCommentIdsThunk = createAsyncThunk(PREFIX + 'handleCommentIds', async (ids: string[], thunkAPI) => {
    const {comments, loadingCommentIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, comments, loadingCommentIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoActions.fetchCommentsThunk(idsToLoad));
  });

  static fetchCommentsThunk = createAsyncThunk(PREFIX + 'fetchComments', async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, CommentService.getCommentInfoByIds);
  });
}
