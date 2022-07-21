import {AppDispatch, RootState} from '../store';
import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../../services/UserService';
import infoSlice from './infoSlice';
import {InfoUtils} from '../../shared/utils/InfoUtils';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo} from '../../models/Comment';
import ItemService from '../../services/ItemService';

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
  FETCH_USERS_BY_USERNAME_PART = 'info/fetchUsersByUsernamePart',
  FETCH_USERS_BY_USERNAME_OR_EMAIL = 'info/fetchUsersByUsernameOrEmail',
}

export class InfoThunks {
  /*
  Users
   */
  static handleUserIds = createAsyncThunk(TYPES.HANDLE_USER_IDS, async (ids: string[], thunkAPI) => {
    const {users, loadingUserIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, users, loadingUserIds);
    thunkAPI.dispatch(InfoThunks.fetchUsers(idsToLoad));
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
    thunkAPI.dispatch(InfoThunks.fetchGroups(idsToLoad));
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
    thunkAPI.dispatch(InfoThunks.fetchItems(idsToLoad));
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
    thunkAPI.dispatch(InfoThunks.fetchChats(idsToLoad));
  });

  static fetchChats = createAsyncThunk(TYPES.FETCH_CHATS, async (ids: string[]) => {
    // TODO
    return (await InfoUtils.fetchIds(ids, undefined)) as ChatInfo[];
  });

  /*
  Messages
   */
  static handleMessageIds = createAsyncThunk(TYPES.HANDLE_MESSAGE_IDS, async (ids: string[], thunkAPI) => {
    const {messages, loadingMessageIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, messages, loadingMessageIds);
    thunkAPI.dispatch(InfoThunks.fetchMessages(idsToLoad));
  });

  static fetchMessages = createAsyncThunk(TYPES.FETCH_MESSAGES, async (ids: string[]) => {
    // TODO
    return (await InfoUtils.fetchIds(ids, undefined)) as MessageInfo[];
  });

  /*
  Comments
   */
  static handleCommentIds = createAsyncThunk(TYPES.HANDLE_COMMENT_IDS, async (ids: string[], thunkAPI) => {
    const {comments, loadingCommentIds} = (thunkAPI.getState() as RootState).info;
    const idsToLoad = InfoUtils.extractIdsToLoad(ids, comments, loadingCommentIds);
    thunkAPI.dispatch(InfoThunks.fetchComments(idsToLoad));
  });

  static fetchComments = createAsyncThunk(TYPES.FETCH_COMMENTS, async (ids: string[]) => {
    // TODO
    return (await InfoUtils.fetchIds(ids, undefined)) as CommentInfo[];
  });

  /*
  Users search
   */
  static fetchUsersByUsernamePart = createAsyncThunk(TYPES.FETCH_USERS_BY_USERNAME_PART, async (part: string) => {
    const result = await UserService.getAllByUsernamePart(part);
    return result.data;
  });

  static fetchUsersByUsernameOrEmail = createAsyncThunk(
    TYPES.FETCH_USERS_BY_USERNAME_OR_EMAIL,
    async (usernameOrEmail: string) => {
      const result = await UserService.getByUsernameOrEmail(usernameOrEmail);
      return result.data;
    },
  );
}
