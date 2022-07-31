import {AppDispatch, RootState} from '../store';
import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../../services/UserService';
import infoSlice from './infoSlice';
import {InfoUtils} from '../../shared/utils/InfoUtils';
import ItemService from '../../services/ItemService';
import ChatService from '../../services/ChatService';
import CommentService from '../../services/CommentService';

export class InfoActions {
  static handleUsers = (users: User[]) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.handleUsers(users));
  };
}

enum TYPES {
  HANDLE_USER_IDS = 'info/handleUserIds',
  FETCH_USERS = 'info/fetchUsers',
  HANDLE_GROUP_IDS = 'info/handleGroupIds',
  FETCH_GROUPS = 'info/fetchGroups',
  HANDLE_ITEM_IDS = 'info/handleItemIds',
  FETCH_ITEMS = 'info/fetchItems',
  HANDLE_CHAT_IDS = 'info/handleChatIds',
  FETCH_CHATS = 'info/fetchChats',
  HANDLE_MESSAGE_IDS = 'info/handleChatIds',
  FETCH_MESSAGES = 'info/fetchMessages',
  HANDLE_COMMENT_IDS = 'info/handleChatIds',
  FETCH_COMMENTS = 'info/fetchComments',
}

export class InfoThunks {
  /*
  Users
  */
  static handleUserIds = createAsyncThunk(TYPES.HANDLE_USER_IDS, async (ids: string[], thunkAPI) => {
    const {users, loadingUserIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, users, loadingUserIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoThunks.fetchUsers(idsToLoad));
  });

  static fetchUsers = createAsyncThunk(TYPES.FETCH_USERS, async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, UserService.getAllByIds);
  });

  /*
  Groups
  */
  static handleGroupIds = createAsyncThunk(TYPES.HANDLE_GROUP_IDS, async (ids: string[], thunkAPI) => {
    const {groups, loadingGroupIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, groups, loadingGroupIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoThunks.fetchGroups(idsToLoad));
  });

  static fetchGroups = createAsyncThunk(TYPES.FETCH_GROUPS, async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ItemService.getGroupInfoByIds);
  });

  /*
  Items
  */
  static handleItemIds = createAsyncThunk(TYPES.HANDLE_ITEM_IDS, async (ids: string[], thunkAPI) => {
    const {items, loadingItemIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, items, loadingItemIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoThunks.fetchItems(idsToLoad));
  });

  static fetchItems = createAsyncThunk(TYPES.FETCH_ITEMS, async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ItemService.getItemInfoByIds);
  });

  /*
  Chats
  */
  static handleChatIds = createAsyncThunk(TYPES.HANDLE_CHAT_IDS, async (ids: string[], thunkAPI) => {
    const {chats, loadingChatIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, chats, loadingChatIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoThunks.fetchChats(idsToLoad));
  });

  static fetchChats = createAsyncThunk(TYPES.FETCH_CHATS, async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ChatService.getChatInfoByIds);
  });

  /*
  Messages
  */
  static handleMessageIds = createAsyncThunk(TYPES.HANDLE_MESSAGE_IDS, async (ids: string[], thunkAPI) => {
    const {messages, loadingMessageIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, messages, loadingMessageIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoThunks.fetchMessages(idsToLoad));
  });

  static fetchMessages = createAsyncThunk(TYPES.FETCH_MESSAGES, async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, ChatService.getMessageInfoByIds);
  });

  /*
  Comments
  */
  static handleCommentIds = createAsyncThunk(TYPES.HANDLE_COMMENT_IDS, async (ids: string[], thunkAPI) => {
    const {comments, loadingCommentIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, comments, loadingCommentIds);
    idsToLoad.length > 0 && thunkAPI.dispatch(InfoThunks.fetchComments(idsToLoad));
  });

  static fetchComments = createAsyncThunk(TYPES.FETCH_COMMENTS, async (ids: string[]) => {
    return await InfoUtils.fetchIds(ids, CommentService.getCommentInfoByIds);
  });
}
