import {AppDispatch, AsyncThunkConfig, RootState} from '../store';
import {User} from '../../models/User';
import {createAsyncThunk} from '@reduxjs/toolkit';
import UserService from '../../services/UserService';
import infoSlice from './infoSlice';
import ItemService from '../../services/ItemService';
import ChatService from '../../services/ChatService';
import CommentService from '../../services/CommentService';
import {GroupInfo} from '../../models/Group';
import {ItemInfo} from '../../models/Item';
import {FilterUtils} from '../../shared/utils/FilterUtils';
import {ChatInfo} from '../../models/Chat';
import {MessageInfo} from '../../models/Message';
import {CommentInfo, CommentThreadInfo} from '../../models/Comment';

const PREFIX = 'info/';

export class InfoActions {
  static handleUsers = (users: User[]) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.handleUsers(users));
  };

  static incrementCommentCount = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.incrementCommentCount(targetId));
  };

  static incrementUnreadCommentCount = (targetId: string) => async (dispatch: AppDispatch) => {
    dispatch(infoSlice.actions.incrementUnreadCommentCount(targetId));
  };

  /*
  Users
  */
  static handleUserIdsThunk = createAsyncThunk<User[], string[], AsyncThunkConfig>(
    PREFIX + 'handleUserIds',
    async (ids, thunkAPI) => {
      const {users, loadingUserIds} = thunkAPI.getState().info;
      const idsToLoad = extractIdsToLoad(ids, users, loadingUserIds);
      return idsToLoad.length > 0 ? (await UserService.getAllByIds(idsToLoad)).data : [];
    },
  );

  /*
  Groups
  */
  static handleGroupIdsThunk = createAsyncThunk<GroupInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleGroupIds',
    async (ids, thunkAPI) => {
      const {groups, loadingGroupIds} = (thunkAPI.getState() as RootState).info;
      const idsToLoad = extractIdsToLoad(ids, groups, loadingGroupIds);
      return idsToLoad.length > 0 ? (await ItemService.getGroupInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Items
  */
  static handleItemIdsThunk = createAsyncThunk<ItemInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleItemIds',
    async (ids, thunkAPI) => {
      const {items, loadingItemIds} = (thunkAPI.getState() as RootState).info;
      const idsToLoad = extractIdsToLoad(ids, items, loadingItemIds);
      return idsToLoad.length > 0 ? (await ItemService.getItemInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Chats
  */
  static handleChatIdsThunk = createAsyncThunk<ChatInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleChatIds',
    async (ids, thunkAPI) => {
      const {chats, loadingChatIds} = (thunkAPI.getState() as RootState).info;
      const idsToLoad = extractIdsToLoad(ids, chats, loadingChatIds);
      return idsToLoad.length > 0 ? (await ChatService.getChatInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Messages
  */
  static handleMessageIdsThunk = createAsyncThunk<MessageInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleMessageIds',
    async (ids, thunkAPI) => {
      const {messages, loadingMessageIds} = (thunkAPI.getState() as RootState).info;
      const idsToLoad = extractIdsToLoad(ids, messages, loadingMessageIds);
      return idsToLoad.length > 0 ? (await ChatService.getMessageInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Comments
  */
  static handleCommentIdsThunk = createAsyncThunk<CommentInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'handleCommentIds',
    async (ids, thunkAPI) => {
      const {comments, loadingCommentsIds} = (thunkAPI.getState() as RootState).info;
      const idsToLoad = extractIdsToLoad(ids, comments, loadingCommentsIds);
      return idsToLoad.length > 0 ? (await CommentService.getCommentInfoByIds(idsToLoad)).data : [];
    },
  );

  /*
  Comment Threads
  */
  static handleCommentThreadIdsThunk = createAsyncThunk<CommentThreadInfo[], string[], AsyncThunkConfig>(
    PREFIX + 'fetchCommentThreads',
    async (targetIds, thunkAPI) => {
      const {commentThreads, loadingCommentThreadIds} = (thunkAPI.getState() as RootState).info;
      const idsToLoad = extractIdsToLoad(targetIds, commentThreads, loadingCommentThreadIds);
      return idsToLoad.length > 0 ? (await CommentService.getThreadInfoByTargetIds(idsToLoad)).data : [];
    },
  );

  static refreshCommentThreadsThunk = createAsyncThunk(PREFIX + 'refreshCommentThreads', async (targetId: string) => {
    await CommentService.refreshThread(targetId);
  });
}

const extractIdsToLoad = (ids: string[], entries: [string, any][], loadingIds: string[]): string[] => {
  const existingIds = entries.map(([key, _]) => key);
  const notAllowedIds = [...existingIds, ...loadingIds];
  return ids
    .filter(FilterUtils.notUndefinedFilter)
    .filter(FilterUtils.notNullFilter)
    .filter(FilterUtils.uniqueFilter)
    .filter((id) => !notAllowedIds.includes(id));
};
